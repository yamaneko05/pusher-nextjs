import { InvitationRepository } from "@/repositories/InvitationRepository";
import { RoomRepository } from "@/repositories/RoomRepository";

export class InvitationService {
  async accept(chatRoomId: string, senderId: string, receiverId: string) {
    const roomRepository = new RoomRepository();
    await roomRepository.addMember(chatRoomId, receiverId);

    const invitationRepository = new InvitationRepository();
    await invitationRepository.update(
      chatRoomId,
      senderId,
      receiverId,
      "ACCEPTED",
    );
  }

  async reject(chatRoomId: string, senderId: string, receiverId: string) {
    const roomRepository = new RoomRepository();
    await roomRepository.addMember(chatRoomId, receiverId);

    const invitationRepository = new InvitationRepository();
    await invitationRepository.update(
      chatRoomId,
      senderId,
      receiverId,
      "REJECTED",
    );
  }
}
