import prisma from "@/utils/prisma";
import { upload } from "@/utils/storage";

export async function createAttachmentUsecase(
  chatMessageId: string,
  file: File
) {
  const path = crypto.randomUUID() + ".webp";

  const fileBody = await file.arrayBuffer();
  await upload("chat-message-attachments", path, fileBody);

  const attachment = await prisma.chatMessageAttachment.create({
    data: { path, chatMessageId },
  });

  return attachment;
}
