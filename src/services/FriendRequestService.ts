import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";

export class FriendRequestService {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async send(receiverId: string) {
    const payload = await getSessionPayloadOrUnauthorized();

    await this.friendRequestRepository.create(payload.user.id, receiverId);
  }

  async accept(senderId: string, receiverId: string) {
    await this.friendRequestRepository.update(senderId, receiverId, "ACCEPTED");

    const userRepository = new UserRepository();
    await userRepository.addFriend(senderId, receiverId);
    await userRepository.addFriend(receiverId, senderId);
  }

  async reject(senderId: string, receiverId: string) {
    await this.friendRequestRepository.update(senderId, receiverId, "REJECTED");
  }
}
