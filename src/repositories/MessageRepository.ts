import prisma from "@/libs/prisma";
import { messageValidator } from "@/utils/prisma-validator";

export class MessageRepository {
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
      ...messageValidator,
    });
  }

  async delete(id: string) {
    return await prisma.chatMessage.delete({
      where: { id },
    });
  }
}
