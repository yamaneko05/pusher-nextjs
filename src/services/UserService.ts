import { UserRepository } from "@/repositories/UserRepository";
import { storage } from "@/utils/storage";
import { createSession, deleteSession } from "@/utils/session";
import { SessionPayload } from "@/utils/types";

export class UserService {
  async delete(id: string) {
    const userRepository = new UserRepository();
    const user = await userRepository.delete(id);

    if (user.image) {
      await storage.remove("avatars", [user.image]);
    }
  }

  async search(name: string) {
    const userRepository = new UserRepository();
    const results = await userRepository.findManyByName(name);

    return results;
  }

  async dissolveFriendship(id: string, friendId: string) {
    const userRepository = new UserRepository();
    await userRepository.removeFriend(id, friendId);
    await userRepository.removeFriend(friendId, id);
  }

  async update(id: string, name: string, biography?: string) {
    const userRepository = new UserRepository();
    const user = await userRepository.updateById(id, name, biography);

    const newPayload: SessionPayload = { user };

    await deleteSession();
    await createSession(newPayload);
  }
}
