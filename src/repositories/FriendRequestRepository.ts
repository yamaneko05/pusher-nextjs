import prisma from "@/libs/prisma";
import { FriendRequest } from "@prisma/client";

export class FriendRequestRepository implements IFriendRequestRepository {
  async create(senderId: string, receiverId: string) {
    return await prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
      },
    });
  }
}

export interface IFriendRequestRepository {
  create(senderId: string, receiverId: string): Promise<FriendRequest>;
  // delete(id: string): Promise<FriendRequest>;
}
