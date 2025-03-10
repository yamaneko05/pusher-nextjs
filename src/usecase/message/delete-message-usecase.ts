import prisma from "@/utils/prisma";
import { remove } from "@/utils/storage";

export async function deleteMessageUsecase(chatMessageId: string) {
  const attachments = await prisma.chatMessageAttachment.findMany({
    where: { chatMessageId },
  });
  if (attachments.length > 0) {
    const paths = attachments.map((attachment) => attachment.path);
    await remove("chat-message-attachments", paths);
  }

  await prisma.chatMessageAttachment.deleteMany({
    where: { chatMessageId },
  });

  await prisma.chatMessage.delete({
    where: { id: chatMessageId },
  });
}
