"use server";

import { MessageService } from "@/services/MessageService";
import { CreateChatMessageSchema } from "@/utils/schemas";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";

export async function createMessageAction(
  chatRoomId: string,
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: CreateChatMessageSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { text, attachments } = submission.value;

  const payload = await getSessionPayloadOrUnauthorized();

  const messageService = new MessageService();
  await messageService.create(payload.user.id, chatRoomId, text, attachments);

  revalidatePath(`/chat-rooms/${chatRoomId}`);
}

export async function deleteMessageAction(
  chatMessageId: string,
  chatRoomId: string,
) {
  const messageService = new MessageService();
  await messageService.delete(chatMessageId);

  revalidatePath(`/chat-rooms/${chatRoomId}`);
}
