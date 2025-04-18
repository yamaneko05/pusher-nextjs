import prisma from "@/libs/prisma";
import * as InvitationValidator from "@/validators/InvitationValidator";

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
