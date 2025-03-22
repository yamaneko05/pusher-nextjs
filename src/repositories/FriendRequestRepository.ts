import prisma from "@/libs/prisma";

export class FriendRequestRepository {
  async create(senderId: string, receiverId: string) {
    return await prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
      },
    });
  }

  async findManyByReceiverId(receiverId: string) {
    return await prisma.friendRequest.findMany({
      where: {
        receiverId,
      },
    });
  }
}
