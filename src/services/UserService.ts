import { UserRepository } from "@/repositories/UserRepository";
import { getSessionPayload } from "@/utils/session";
import { storage } from "@/utils/storage";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async delete(id: string) {
    const user = await this.userRepository.delete(id);

    if (user.image) {
      await storage.remove("avatars", [user.image]);
    }
  }

  async search(name: string) {
    const session = await getSessionPayload();

    if (!session) {
      throw new Error("unauthorized");
    }

    const results = await this.userRepository.findManyByName(name);

    return results;
  }

  async dissolveFriendship(friendId: string) {
    const session = await getSessionPayload();

    if (!session) {
      throw new Error("unauthorized");
    }

    await this.userRepository.removeFriend(session.user.id, friendId);
    await this.userRepository.removeFriend(friendId, session.user.id);
  }
}
