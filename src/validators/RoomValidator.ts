import { Prisma } from "@prisma/client";
import { MessageValidator } from "./MessageValidator";

export class RoomValidator {
  static create() {
    const forCard = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
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
    });

    const messageValidator = MessageValidator.create();
    const forPage = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
      select: {
        id: true,
        name: true,
        chatMessages: messageValidator.base,
      },
    });

    return { forCard, forPage };
  }
}
