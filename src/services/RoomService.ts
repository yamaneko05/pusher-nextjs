import { RoomRepository } from "@/repositories/RoomRepository";
import { getSessionPayload } from "@/utils/session";

export class RoomService {
  constructor(private roomRepository: RoomRepository) {}

  async create(name: string) {
    const payload = await getSessionPayload();
    if (!payload) {
      throw new Error("unauthorized");
    }

    const room = await this.roomRepository.create(name, payload.user.id);

    return room;
  }
}
