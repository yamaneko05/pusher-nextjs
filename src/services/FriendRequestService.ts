import { IFriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { getSessionPayload } from "@/utils/session";

export class FriendRequestService {
  constructor(private friendRequestRepository: IFriendRequestRepository) {}

  async send(receiverId: string) {
    const session = await getSessionPayload();

    if (!session) {
      throw new Error("unauthorized");
    }

    await this.friendRequestRepository.create(session.user.id, receiverId);
  }
}
