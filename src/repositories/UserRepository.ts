import prisma from "@/libs/prisma";

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

  async findManyByName(name: string) {
    return await prisma.user.findMany({
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
