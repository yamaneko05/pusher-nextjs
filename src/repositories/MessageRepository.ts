import prisma from "@/libs/prisma";
import { MessageValidator } from "@/validators/MessageValidator";

export class MessageRepository {
  private messageValidator = MessageValidator.create();

  async create(
    text: string,
    chatRoomId: string,
    userId: string,
    paths: string[],
  ) {
    return await prisma.chatMessage.create({
      data: {
        text,
        chatRoomId,
        userId,
        attachments: {
          create: paths.map((path) => ({ path })),
        },
      },
      ...this.messageValidator.base,
    });
  }

  async delete(id: string) {
    return await prisma.chatMessage.delete({
      where: { id },
    });
  }
}
