import { RoomRepository } from "@/repositories/RoomRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";

export class RoomService {
  constructor(private roomRepository: RoomRepository) {}

  async create(name: string) {
    const payload = await getSessionPayloadOrUnauthorized();

    const room = await this.roomRepository.create(name, payload.user.id);

    return room;
  }
}
