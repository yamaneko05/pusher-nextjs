import { Prisma } from "@prisma/client";

export const roomCardValidator = Prisma.validator<Prisma.ChatRoomDefaultArgs>()(
  {
    select: {
      id: true,
      name: true,
      owner: {
        select: {
          id: true,
          image: true,
        },
      },
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
  },
);

export const attachmentCardValidator =
  Prisma.validator<Prisma.ChatMessageAttachmentDefaultArgs>()({
    select: {
      id: true,
      path: true,
    },
  });

export const messageValidator =
  Prisma.validator<Prisma.ChatMessageDefaultArgs>()({
    select: {
      id: true,
      text: true,
      chatRoomId: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      attachments: attachmentCardValidator,
    },
  });

export const roomWithMessages = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
  select: {
    id: true,
    name: true,
    chatMessages: messageValidator,
  },
});

export const userCardValidator = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    image: true,
  },
});

export const adminUserCardValidator =
  Prisma.validator<Prisma.UserDefaultArgs>()({
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
  });
