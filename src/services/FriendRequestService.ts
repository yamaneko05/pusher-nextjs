import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";

export class FriendRequestService {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async send(receiverId: string) {
    const payload = await getSessionPayloadOrUnauthorized();

    await this.friendRequestRepository.create(payload.user.id, receiverId);
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
