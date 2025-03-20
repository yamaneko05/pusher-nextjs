"use server";

import { RoomRepository } from "@/repositories/RoomRepository";
import { RoomService } from "@/services/RoomService";
import { CreateChatRoomSchema } from "@/utils/schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createRoomAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: CreateChatRoomSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name } = submission.value;

  const roomRepository = new RoomRepository();
  const roomService = new RoomService(roomRepository);
  const { id } = await roomService.create(name);

  redirect(`/chat-rooms/${id}`);
}
