import { UserRepository } from "@/repositories/UserRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { storage } from "@/utils/storage";
import { createSession, deleteSession } from "@/utils/session";
import { SessionPayload } from "@/utils/types";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async delete(id: string) {
    const user = await this.userRepository.delete(id);

    if (user.image) {
      await storage.remove("avatars", [user.image]);
    }
  }

  async search(name: string) {
    const results = await this.userRepository.findManyByName(name);

    return results;
  }

  async dissolveFriendship(friendId: string) {
    const payload = await getSessionPayloadOrUnauthorized();

    await this.userRepository.removeFriend(payload.user.id, friendId);
    await this.userRepository.removeFriend(friendId, payload.user.id);
  }

  async update(name: string, biography?: string) {
    const payload = await getSessionPayloadOrUnauthorized();

    await this.userRepository.updateById(payload.user.id, name, biography);

    const newPayload: SessionPayload = {
      user: {
        ...payload.user,
        name,
      },
    };

    await deleteSession();
    await createSession(newPayload);
  }
}
