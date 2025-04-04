import { comparePassword } from "@/utils/password";
import { createSession, deleteSession } from "@/utils/session";
import { resizeImage } from "@/utils/image";
import { encryptPassword } from "@/utils/password";
import { UserRepository } from "@/repositories/UserRepository";
import { storage } from "@/utils/storage";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signin(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return { error: "UserNotFound" };
    }

    if (!comparePassword(password, user.password)) {
      return { error: "IncorrectPassword" };
    }

    await createSession({ user });

    return { error: null };
  }

  async signup(name: string, email: string, password: string, image: File) {
    const passwordHash = encryptPassword(password);

    const imageBuffer = await image.arrayBuffer();
    const resized = await resizeImage(imageBuffer);
    const path = crypto.randomUUID() + ".webp";
    await storage.upload("avatars", path, resized);

    const user = await this.userRepository.create(
      name,
      email,
      passwordHash,
      path,
    );

    await createSession({ user });

    return user;
  }

  async signout() {
    await deleteSession();
  }
}

export class UserNotFoundError extends Error {}
export class IncorrectPasswordError extends Error {}
