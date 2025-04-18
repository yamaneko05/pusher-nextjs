import { comparePassword } from "@/utils/password";
import { createSession, deleteSession } from "@/utils/session";
import { resizeImage } from "@/utils/image";
import { encryptPassword } from "@/utils/password";
import { UserRepository } from "@/repositories/UserRepository";
import { storage } from "@/utils/storage";

export class AuthService {
  async signin(email: string, password: string) {
    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);

    const result: { error: string | null } = { error: null };

    if (!user) {
      result.error = "UserNotFound";
      return result;
    }

    if (!comparePassword(password, user.password)) {
      result.error = "IncorrectPassword";
      return result;
    }

    await createSession({ user });
    return result;
  }

  async signup(name: string, email: string, password: string, image: File) {
    const passwordHash = encryptPassword(password);

    const imageBuffer = await image.arrayBuffer();
    const resized = await resizeImage(imageBuffer);
    const path = crypto.randomUUID() + ".webp";
    await storage.upload("avatars", path, resized);

    const userRepository = new UserRepository();
    const user = await userRepository.create(name, email, passwordHash, path);

    await createSession({ user });
  }

  async signout() {
    await deleteSession();
  }
}
