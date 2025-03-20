import { UserRepository } from "@/repositories/UserRepository";
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
    const results = await this.userRepository.findManyByName(name);

    return results;
  }
}
