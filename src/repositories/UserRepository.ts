import prisma from "@/libs/prisma";
import { userCardValidator } from "@/utils/prisma-validator";

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      omit: {
        password: false,
      },
    });
  }

  async create(
    name: string,
    email: string,
    passwordHash: string,
    path: string,
  ) {
    return await prisma.user.create({
      data: { name, email, password: passwordHash, image: path },
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async findManyByName(name: string, sessionUserId: string) {
    return await prisma.user.findMany({
      select: {
        ...userCardValidator.select,
        _count: {
          select: {
            friends: {
              where: {
                id: sessionUserId,
              },
            },
            receivedRequests: {
              where: {
                senderId: sessionUserId,
              },
            },
          },
        },
      },
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async getAll() {
    return await prisma.user.findMany();
  }
}
