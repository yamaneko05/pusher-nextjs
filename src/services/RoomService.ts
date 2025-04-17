import { InvitationRepository } from "@/repositories/InvitationRepository";
import { RoomRepository } from "@/repositories/RoomRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { CreateChatRoomRequest } from "@/utils/types";

export class RoomService {
  constructor(private roomRepository: RoomRepository) {}

  async create(request: CreateChatRoomRequest) {
    const { name, method, members } = request;

    const room = await this.roomRepository.create(name);

    const payload = await getSessionPayloadOrUnauthorized();
    await this.roomRepository.addMember(room.id, payload.user.id);

    if (method === "invitation") {
      const invitationRepository = new InvitationRepository();
      members.forEach(async (userId) => {
        await invitationRepository.create(room.id, payload.user.id, userId);
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
