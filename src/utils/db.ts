import "server-only";
import prisma from "./prisma";

export async function createUser(
  name: string,
  email: string,
  passwordHash: string,
  imagePath: string
) {
  const user = await prisma.user.create({
    data: { name, email, password: passwordHash, image: imagePath },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  });
}
