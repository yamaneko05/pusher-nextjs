"use server";

import { createMessageUsecase } from "@/usecase/message/create-message-usecase";
import { deleteMessageUsecase } from "@/usecase/message/delete-message-usecase";
import { CreateChatMessageSchema } from "@/utils/definitions";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";

export async function createMessageAction(
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

  const { text, attachments } = submission.value;

  await createMessageUsecase(chatRoomId, text, attachments);

  revalidatePath(`/chat-rooms/${chatRoomId}`);
}

export async function deleteMessageAction(
  chatMessageId: string,
  chatRoomId: string
) {
  await deleteMessageUsecase(chatMessageId);
  revalidatePath(`/chat-rooms/${chatRoomId}`);
}
