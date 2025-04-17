import prisma from "@/libs/prisma";

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
}
