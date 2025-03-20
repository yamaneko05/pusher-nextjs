import "server-only";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
