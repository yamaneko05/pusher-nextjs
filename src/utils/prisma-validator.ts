import { Prisma } from "@prisma/client";

export const chatRoomWithOwner = Prisma.validator<Prisma.ChatRoomDefaultArgs>()(
  {
    include: { owner: true },
  }
);

export const chatMessageWithUser =
  Prisma.validator<Prisma.ChatMessageDefaultArgs>()({
    include: { user: true },
  });

export const chatRoomWithMessages =
  Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
    include: {
      chatMessages: chatMessageWithUser,
    },
  });

export type ChatRoomWithOwner = Prisma.ChatRoomGetPayload<
  typeof chatRoomWithOwner
>;

export type chatMessageWithUser = Prisma.ChatMessageGetPayload<
  typeof chatMessageWithUser
>;

export type chatRoomWithMessages = Prisma.ChatRoomGetPayload<
  typeof chatRoomWithMessages
>;
