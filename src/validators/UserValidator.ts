import { Prisma } from "@prisma/client";
import { RoomValidator } from "./RoomValidator";

export class UserValidator {
  static create() {
    const base = Prisma.validator<Prisma.UserDefaultArgs>()({
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    const forCard = Prisma.validator<Prisma.UserDefaultArgs>()({
      select: {
        ...base.select,
        _count: {
          select: {
            friends: true,
            receivedRequests: true,
          },
        },
      },
    });

    const forAdmin = Prisma.validator<Prisma.UserDefaultArgs>()({
      select: {
        ...base.select,
        email: true,
      },
    });

    const roomValidator = RoomValidator.create();
    const forPage = Prisma.validator<Prisma.UserDefaultArgs>()({
      select: {
        ...base.select,
        email: true,
        chatRooms: roomValidator.forCard,
      },
    });

    return { base, forCard, forAdmin, forPage };
  }
}
