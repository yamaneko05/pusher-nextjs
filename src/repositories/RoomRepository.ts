import prisma from "@/libs/prisma";
import { RoomValidator } from "@/validators/RoomValidator";

export class RoomRepository {
  private roomValidator = RoomValidator.create();

  async create(name: string, ownerId: string) {
    return await prisma.chatRoom.create({
      data: {
        name,
        ownerId,
      },
    });
  }

  async getAll() {
    return await prisma.chatRoom.findMany(this.roomValidator.forCard);
  }

  async getWithMessages(id: string) {
    return await prisma.chatRoom.findUnique({
      where: { id },
      ...this.roomValidator.forPage,
    });
  }
}
