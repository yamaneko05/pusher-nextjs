/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { UserValidator } from "@/validators/UserValidator";
import { RoomValidator } from "@/validators/RoomValidator";
import { AttachmentValidator } from "@/validators/AttachmentValidator";
import { MessageValidator } from "@/validators/MessageValidator";
import { FriendRequestValidator } from "@/validators/FriendRequestValidator";

const roomValidator = RoomValidator.create();
export type RoomForCard = Prisma.ChatRoomGetPayload<
  typeof roomValidator.forCard
>;

const attachmentValidator = AttachmentValidator.create();
export type AttachmentBase = Prisma.ChatMessageAttachmentGetPayload<
  typeof attachmentValidator.base
>;

const userValidator = UserValidator.create();
export type UserBase = Prisma.UserGetPayload<typeof userValidator.base>;
export type UserForCard = Prisma.UserGetPayload<typeof userValidator.forCard>;
export type UserForAdmin = Prisma.UserGetPayload<typeof userValidator.forAdmin>;
export type UserForPage = Prisma.UserGetPayload<typeof userValidator.forPage>;

const messageValidator = MessageValidator.create();
export type MessageForCard = Prisma.ChatMessageGetPayload<
  typeof messageValidator.base
>;

const friendRequestValidator = FriendRequestValidator.create();
export type FriendRequestBase = Prisma.FriendRequestGetPayload<
  typeof friendRequestValidator.base
>;

export type SessionPayload = {
  user: {
    id: string;
    name: string;
    image: string;
  };
};
