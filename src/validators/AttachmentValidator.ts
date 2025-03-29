import { Prisma } from "@prisma/client";

export const base = Prisma.validator<Prisma.ChatMessageAttachmentDefaultArgs>()(
  {
    select: {
      id: true,
      path: true,
    },
  },
);
