"use server";

import { createChatMessage, deleteChatMessage } from "@/utils/db";
import { CreateChatMessageSchema } from "@/utils/definitions";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";

export async function createChatMessageAction(
  chatRoomId: string,
  prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: CreateChatMessageSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { text } = submission.value;
  await createChatMessage(chatRoomId, text);

  revalidatePath(`/chat-rooms/${chatRoomId}`);
}

export async function deleteChatMessageAction(
  chatMessageId: string,
  chatRoomId: string
) {
  await deleteChatMessage(chatMessageId);
  revalidatePath(`/chat-rooms/${chatRoomId}`);
}
