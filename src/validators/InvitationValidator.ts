import { Prisma } from "@prisma/client";

export const base = Prisma.validator<Prisma.ChatRoomInvitationDefaultArgs>()({
  select: {
    chatRoom: {
      select: {
        id: true,
        name: true,
      },
    },
    sender: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
  },
});
