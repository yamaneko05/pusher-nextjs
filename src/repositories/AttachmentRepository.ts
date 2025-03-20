import prisma from "@/libs/prisma";

export class AttachmentRepository {
  async findManyByMessageId(messageId: string) {
    return await prisma.chatMessageAttachment.findMany({
      where: { chatMessageId: messageId },
    });
  }

  async deleteManyByMessageId(messageId: string) {
    return await prisma.chatMessageAttachment.deleteMany({
      where: { chatMessageId: messageId },
    });
  }
}
