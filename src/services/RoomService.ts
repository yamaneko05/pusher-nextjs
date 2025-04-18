import { InvitationRepository } from "@/repositories/InvitationRepository";
import { RoomRepository } from "@/repositories/RoomRepository";
import { CreateChatRoomRequest } from "@/utils/types";

export class RoomService {
  constructor(private roomRepository: RoomRepository) {}

  async create(request: CreateChatRoomRequest, userId: string) {
    const { name, method, members } = request;

    const room = await this.roomRepository.create(name);
    await this.roomRepository.addMember(room.id, userId);

    if (method === "invitation") {
      const invitationRepository = new InvitationRepository();
      members.forEach(async (userId) => {
        await invitationRepository.create(room.id, userId, userId);
      });
    } else {
      members.forEach(async (userId) => {
        await this.roomRepository.addMember(room.id, userId);
      });
    }

    return room;
  }

  async delete(id: string) {
    await this.roomRepository.delete(id);
  }
}
