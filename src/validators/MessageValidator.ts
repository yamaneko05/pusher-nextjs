import { Prisma } from "@prisma/client";
import { AttachmentValidator } from "./AttachmentValidator";

export class MessageValidator {
  static create() {
    const attachmentValidator = AttachmentValidator.create();
    const base = Prisma.validator<Prisma.ChatMessageDefaultArgs>()({
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
        attachments: attachmentValidator.base,
      },
    });

    return { base };
  }
}
