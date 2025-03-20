"use server";

import { AttachmentRepository } from "@/repositories/AttachmentRepository";
import { MessageRepository } from "@/repositories/MessageRepository";
import { MessageService } from "@/services/MessageService";
import { CreateChatMessageSchema } from "@/utils/schemas";
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

  const messageRepository = new MessageRepository();
  const messageService = new MessageService(messageRepository);
  await messageService.create(chatRoomId, text, attachments);

  revalidatePath(`/chat-rooms/${chatRoomId}`);
}

export async function deleteMessageAction(
  chatMessageId: string,
  chatRoomId: string,
) {
  const messageRepository = new MessageRepository();
  const attachmentRepository = new AttachmentRepository();
  const messageService = new MessageService(messageRepository);
  await messageService.delete(chatMessageId, attachmentRepository);

  revalidatePath(`/chat-rooms/${chatRoomId}`);
}
