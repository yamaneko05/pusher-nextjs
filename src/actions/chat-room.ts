"use server";

import { createChatRoom } from "@/utils/db";
import { CreateChatRoomSchema } from "@/utils/definitions";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createChatRoomAction(
  prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, { schema: CreateChatRoomSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name } = submission.value;
  const { id } = await createChatRoom(name);

  redirect(`/chat-rooms/${id}`);
}
