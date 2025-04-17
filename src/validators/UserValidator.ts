import { Prisma } from "@prisma/client";

export const base = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    image: true,
  },
});

export const forCard = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    ...base.select,
    friends: {
      select: {
        id: true,
      },
    },
    receivedRequests: {
      select: {
        senderId: true,
        status: true,
      },
    },
  },
});

export const forAdmin = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    ...base.select,
    email: true,
  },
});

export const forPage = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    ...forCard.select,
    email: true,
    biography: true,
  },
});
