"use server";

import { RoomRepository } from "@/repositories/RoomRepository";
import { RoomService } from "@/services/RoomService";
import { CreateChatRoomSchema } from "@/utils/schemas";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createRoomAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: CreateChatRoomSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const request = submission.value;

  const payload = await getSessionPayloadOrUnauthorized();

  const roomRepository = new RoomRepository();
  const roomService = new RoomService(roomRepository);
  const { id } = await roomService.create(request, payload.user.id);

  redirect(`/chat-rooms/${id}`);
}
