import { resizeImage } from "@/utils/image";
import { encryptPassword } from "@/utils/password";
import prisma from "@/utils/prisma";
import { createSession } from "@/utils/session";
import { upload } from "@/utils/storage";

export async function signupUsecase(
  name: string,
  email: string,
  password: string,
  image: File
) {
  const passwordHash = encryptPassword(password);

  const imageBuffer = await image.arrayBuffer();
  const resized = await resizeImage(imageBuffer);
  const path = crypto.randomUUID() + ".webp";
  await upload("avatars", path, resized);

  const user = await prisma.user.create({
    data: { name, email, password: passwordHash, image: path },
  });

  await createSession({
    user: { id: user.id, name: user.name, image: user.image },
  });

  return user;
}
