import { Prisma } from "@prisma/client";

export const roomValidator = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
  include: {
    owner: true,
    chatMessages: {
      take: 1,
      include: {
        user: true,
      },
    },
  },
});

export const messageValidator =
  Prisma.validator<Prisma.ChatMessageDefaultArgs>()({
    include: { user: true, attachments: true },
  });

export const chatRoomWithMessages =
  Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
    include: {
      chatMessages: messageValidator,
    },
  });

export const userValidator = Prisma.validator<Prisma.UserDefaultArgs>()({});

export type RoomValidator = Prisma.ChatRoomGetPayload<typeof roomValidator>;

export type MessageValidator = Prisma.ChatMessageGetPayload<
  typeof messageValidator
>;

export type RoomWithMessages = Prisma.ChatRoomGetPayload<
  typeof chatRoomWithMessages
>;
