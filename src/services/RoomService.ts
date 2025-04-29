import { InvitationRepository } from "@/repositories/InvitationRepository";
import { RoomRepository } from "@/repositories/RoomRepository";
import { CreateChatRoomRequest, UpdateRoomRequest } from "@/utils/types";

export class RoomService {
  async create(request: CreateChatRoomRequest, userId: string) {
    const { name, method, members } = request;

    const roomRepository = new RoomRepository();
    const room = await roomRepository.create(name);
    await roomRepository.addMember(room.id, userId);

    if (method === "invitation") {
      const invitationRepository = new InvitationRepository();
      members.forEach(async (userId) => {
        await invitationRepository.create(room.id, userId, userId);
      });
    } else {
      members.forEach(async (userId) => {
        await roomRepository.addMember(room.id, userId);
      });
    }

    return room;
  }

  async delete(id: string) {
    const roomRepository = new RoomRepository();

    await roomRepository.delete(id);
  }

  async update(id: string, request: UpdateRoomRequest) {
    const { name } = request;

    const roomRepository = new RoomRepository();
    await roomRepository.update(id, name);
  }
}
