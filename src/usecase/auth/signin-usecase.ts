import { comparePassword } from "@/utils/password";
import prisma from "@/utils/prisma";
import { createSession } from "@/utils/session";

export async function signinUsecase(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    omit: {
      password: false,
    },
  });

  if (!user) {
    return { error: new UserNotFoundError() };
  }

  if (!comparePassword(password, user.password)) {
    return { error: new IncorrectPasswordError() };
  }

  await createSession({
    user: { id: user.id, name: user.name, image: user.image },
  });

  return { error: null };
}

export class UserNotFoundError extends Error {}
export class IncorrectPasswordError extends Error {}
