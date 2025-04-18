import prisma from "@/libs/prisma";
import * as InvitationValidator from "@/validators/InvitationValidator";
import { InvitationStatus } from "@prisma/client";

export class InvitationRepository {
  async create(chatRoomId: string, senderId: string, receiverId: string) {
    return await prisma.chatRoomInvitation.create({
      data: {
        chatRoomId,
        senderId,
        receiverId,
      },
    });
  }

  async update(
    chatRoomId: string,
    senderId: string,
    receiverId: string,
    status: InvitationStatus,
  ) {
    await prisma.chatRoomInvitation.update({
      where: {
        chatRoomId_senderId_receiverId: {
          chatRoomId,
          senderId,
          receiverId,
        },
      },
      data: {
        status,
      },
    });
  }

  async getPendingInvitations(receiverId: string) {
    return await prisma.chatRoomInvitation.findMany({
      ...InvitationValidator.base,
      where: {
        receiverId,
        status: "PENDING",
      },
    });
  }
}
