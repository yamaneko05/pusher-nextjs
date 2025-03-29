import { Prisma } from "@prisma/client";
import * as UserValidator from "./UserValidator";

export const base = Prisma.validator<Prisma.FriendRequestDefaultArgs>()({
  select: {
    id: true,
    createdAt: true,
    status: true,
    sender: UserValidator.base,
  },
});
