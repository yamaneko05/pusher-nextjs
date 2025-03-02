import "server-only";
import prisma from "./prisma";

export async function createUser(
  name: string,
  email: string,
  passwordHash: string
) {
  const user = await prisma.user.create({
    data: { name, email, password: passwordHash },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}
