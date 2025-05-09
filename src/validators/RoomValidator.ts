import { Prisma } from "@prisma/client";
import * as MessageValidator from "./MessageValidator";
import * as UserValidator from "./UserValidator";

export const forCard = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
  select: {
    id: true,
    name: true,
    chatMessages: {
      take: 1,
      select: {
        text: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    },
  },
});

export const forPage = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
  select: {
    id: true,
    name: true,
    chatMessages: MessageValidator.base,
    members: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
  },
});

export const forSettingPage = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
  select: {
    id: true,
    name: true,
    members: UserValidator.forCard,
  },
});
