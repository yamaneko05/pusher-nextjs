import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { UserRepository } from "@/repositories/UserRepository";

export class FriendRequestService {
  async send(senderId: string, receiverId: string) {
    const friendRequestRepository = new FriendRequestRepository();
    await friendRequestRepository.create(senderId, receiverId);
  }

  async accept(senderId: string, receiverId: string) {
    const userRepository = new UserRepository();
    await userRepository.addFriend(senderId, receiverId);
    await userRepository.addFriend(receiverId, senderId);

    const friendRequestRepository = new FriendRequestRepository();
    await friendRequestRepository.update(senderId, receiverId, "ACCEPTED");
  }

  async reject(senderId: string, receiverId: string) {
    const friendRequestRepository = new FriendRequestRepository();
    await friendRequestRepository.update(senderId, receiverId, "REJECTED");
  }
}
