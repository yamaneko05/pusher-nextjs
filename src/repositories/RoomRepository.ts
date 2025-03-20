import prisma from "@/libs/prisma";
import { roomWithMessages, roomCardValidator } from "@/utils/prisma-validator";

export class RoomRepository {
  async create(name: string, ownerId: string) {
    return await prisma.chatRoom.create({
      data: {
        name,
        ownerId,
      },
    });
  }

  async getAll() {
    return await prisma.chatRoom.findMany(roomCardValidator);
  }

  async getWithMessages(id: string) {
    return await prisma.chatRoom.findUnique({
      where: { id },
      ...roomWithMessages,
    });
  }
}
