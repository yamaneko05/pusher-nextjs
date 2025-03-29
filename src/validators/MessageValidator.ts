import { Prisma } from "@prisma/client";
import * as AttachmentValidator from "./AttachmentValidator";

export const base = Prisma.validator<Prisma.ChatMessageDefaultArgs>()({
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
    attachments: AttachmentValidator.base,
  },
});
