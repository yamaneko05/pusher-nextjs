import prisma from "@/libs/prisma";
import * as RoomValidator from "@/validators/RoomValidator";

export class RoomRepository {
  async create(name: string) {
    return await prisma.chatRoom.create({
      data: {
        name,
      },
    });
  }

  async addMember(id: string, userId: string) {
    return await prisma.chatRoom.update({
      where: {
        id,
      },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
  }

  async getChatRooms(userId: string) {
    return await prisma.chatRoom.findMany({
      ...RoomValidator.forCard,
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getWithMessages(id: string) {
    return await prisma.chatRoom.findUnique({
      where: { id },
      ...RoomValidator.forPage,
    });
  }

  async getById(id: string) {
    return await prisma.chatRoom.findUnique({
      where: { id },
      ...RoomValidator.forSettingPage,
    });
  }

  async delete(id: string) {
    return await prisma.chatRoom.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, name: string) {
    return await prisma.chatRoom.update({
      where: { id },
      data: {
        name,
      },
    });
  }
}
