"use server";

import { RoomService } from "@/services/RoomService";
import { CreateChatRoomSchema, UpdateRoomSchema } from "@/utils/schemas";
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

  const roomService = new RoomService();
  const { id } = await roomService.create(request, payload.user.id);

  redirect(`/chat-rooms/${id}`);
}

export async function updateRoomAction(id: string, formData: FormData) {
  const submission = parseWithZod(formData, { schema: UpdateRoomSchema });

  if (submission.status !== "success") {
    throw new Error("validation faild");
  }

  const request = submission.value;

  const roomService = new RoomService();
  await roomService.update(id, request);

  return submission.reply({ resetForm: true });
}
