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

export const chatMessageWithAttachments =
  Prisma.validator<Prisma.ChatMessageDefaultArgs>()({
    include: { attachments: true },
  });

export const chatRoomWithMessages =
  Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
    include: {
      chatMessages: {
        include: {
          ...chatMessageWithUser.include,
          ...chatMessageWithAttachments.include,
        },
      },
    },
  });

export type ChatRoomWithOwner = Prisma.ChatRoomGetPayload<
  typeof chatRoomWithOwner
>;

export type ChatMessageWithUser = Prisma.ChatMessageGetPayload<
  typeof chatMessageWithUser
>;

export type ChatMessageWithAttachments = Prisma.ChatMessageGetPayload<
  typeof chatMessageWithAttachments
>;

export type chatRoomWithMessages = Prisma.ChatRoomGetPayload<
  typeof chatRoomWithMessages
>;
