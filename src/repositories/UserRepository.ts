import prisma from "@/libs/prisma";
import { UserValidator } from "@/validators/UserValidator";

export class UserRepository {
  private userValidator = UserValidator.create();

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      omit: {
        password: false,
      },
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      ...this.userValidator.forPage,
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

  async findManyByName(name: string) {
    return await prisma.user.findMany({
      ...this.userValidator.forCard,
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async getAll() {
    return await prisma.user.findMany(this.userValidator.forAdmin);
  }

  async getFriends(id: string) {
    return await prisma.user.findMany({
      ...this.userValidator.forCard,
      where: {
        friends: {
          some: {
            id,
          },
        },
      },
    });
  }

  async addFriend(id: string, friendId: string) {
    return await prisma.user.update({
      where: { id },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
    });
  }

  async removeFriend(id: string, friendId: string) {
    return await prisma.user.update({
      where: { id },
      data: {
        friends: {
          disconnect: { id: friendId },
        },
      },
    });
  }

  async updateById(id: string, name: string, biography?: string) {
    return await prisma.user.update({
      where: { id },
      data: { name, biography: biography ?? null },
    });
  }
}
