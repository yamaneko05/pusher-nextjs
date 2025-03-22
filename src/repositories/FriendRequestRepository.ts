import prisma from "@/libs/prisma";
import { FriendRequestValidator } from "@/validators/FriendRequestValidator";
import { RequestStatus } from "@prisma/client";

export class FriendRequestRepository {
  private friendRequestValidator = FriendRequestValidator.create();

  async create(senderId: string, receiverId: string) {
    return await prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
      },
    });
  }

  async getPendingRequests(receiverId: string) {
    return await prisma.friendRequest.findMany({
      where: {
        receiverId,
        status: "PENDING",
      },
      ...this.friendRequestValidator.base,
    });
  }

  async updateById(id: string, status: RequestStatus) {
    return await prisma.friendRequest.update({
      where: { id },
      data: {
        status,
      },
    });
  }
}
