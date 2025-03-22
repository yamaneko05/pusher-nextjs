import { Prisma } from "@prisma/client";
import { UserValidator } from "./UserValidator";

export class FriendRequestValidator {
  static create() {
    const userValidator = UserValidator.create();
    const base = Prisma.validator<Prisma.FriendRequestDefaultArgs>()({
      select: {
        id: true,
        createdAt: true,
        status: true,
        sender: userValidator.base,
      },
    });

    return { base };
  }
}
