import { Prisma, UserRole } from "@prisma/client";
import * as UserValidator from "@/validators/UserValidator";
import * as RoomValidator from "@/validators/RoomValidator";
import * as AttachmentValidator from "@/validators/AttachmentValidator";
import * as MessageValidator from "@/validators/MessageValidator";
import * as FriendRequestValidator from "@/validators/FriendRequestValidator";

export type RoomForCard = Prisma.ChatRoomGetPayload<
  typeof RoomValidator.forCard
>;

export type AttachmentBase = Prisma.ChatMessageAttachmentGetPayload<
  typeof AttachmentValidator.base
>;

export type UserBase = Prisma.UserGetPayload<typeof UserValidator.base>;
export type UserForCard = Prisma.UserGetPayload<typeof UserValidator.forCard>;
export type UserForAdmin = Prisma.UserGetPayload<typeof UserValidator.forAdmin>;
export type UserForPage = Prisma.UserGetPayload<typeof UserValidator.forPage>;

export type MessageForCard = Prisma.ChatMessageGetPayload<
  typeof MessageValidator.base
>;

export type FriendRequestBase = Prisma.FriendRequestGetPayload<
  typeof FriendRequestValidator.base
>;

export type SessionPayload = {
  user: {
    id: string;
    name: string;
    image: string;
    role: UserRole;
  };
};
