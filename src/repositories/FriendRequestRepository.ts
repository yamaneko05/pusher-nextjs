import prisma from "@/libs/prisma";
import * as FriendRequestValidator from "@/validators/FriendRequestValidator";
import { RequestStatus } from "@prisma/client";

export class FriendRequestRepository {
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
      ...FriendRequestValidator.base,
    });
  }

  async update(senderId: string, receiverId: string, status: RequestStatus) {
    return await prisma.friendRequest.update({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
      data: {
        status,
      },
    });
  }
}
