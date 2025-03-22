import { Prisma } from "@prisma/client";

export class AttachmentValidator {
  static create() {
    const base = Prisma.validator<Prisma.ChatMessageAttachmentDefaultArgs>()({
      select: {
        id: true,
        path: true,
      },
    });
    return { base };
  }
}
