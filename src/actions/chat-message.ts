"use server";

import {
  createChatMessage,
  createChatMessageAttachment,
  deleteChatMessage,
} from "@/utils/db";
import { CreateChatMessageSchema } from "@/utils/definitions";
import { upload } from "@/utils/storage";
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

  const { text, attachments } = submission.value;

  const { id: chatMessageId } = await createChatMessage(chatRoomId, text);

  Array.from(attachments).map(async (attachment) => {
    const path = crypto.randomUUID() + ".webp";
    await createChatMessageAttachment(chatMessageId, path);

    const fileBody = await attachment.arrayBuffer();
    await upload("chat-message-attachments", path, fileBody);
  });

  revalidatePath(`/chat-rooms/${chatRoomId}`);
}

export async function deleteChatMessageAction(
  chatMessageId: string,
  chatRoomId: string
) {
  await deleteChatMessage(chatMessageId);
  revalidatePath(`/chat-rooms/${chatRoomId}`);
}
