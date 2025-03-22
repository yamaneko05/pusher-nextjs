import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { UserRepository } from "@/repositories/UserRepository";
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

  async accept(id: string) {
    const friendRequest = await this.friendRequestRepository.updateById(
      id,
      "ACCEPTED",
    );

    const userRepository = new UserRepository();
    await userRepository.addFriend(
      friendRequest.senderId,
      friendRequest.receiverId,
    );
    await userRepository.addFriend(
      friendRequest.receiverId,
      friendRequest.senderId,
    );
  }

  async reject(id: string) {
    await this.friendRequestRepository.updateById(id, "REJECTED");
  }
}
