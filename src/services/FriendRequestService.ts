import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { getSessionPayload } from "@/utils/session";

export class FriendRequestService {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async send(receiverId: string) {
    const session = await getSessionPayload();

    if (!session) {
      throw new Error("unauthorized");
    }

    await this.friendRequestRepository.create(session.user.id, receiverId);
  }
}
