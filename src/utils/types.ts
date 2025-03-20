import { Prisma } from "@prisma/client";
import {
  adminUserCardValidator,
  attachmentCardValidator,
  messageValidator,
  roomCardValidator,
  userCardValidator,
} from "./prisma-validator";

export type RoomForCard = Prisma.ChatRoomGetPayload<typeof roomCardValidator>;

export type AttachmentForCard = Prisma.ChatMessageAttachmentGetPayload<
  typeof attachmentCardValidator
>;

export type UserForCard = Prisma.UserGetPayload<typeof userCardValidator>;

export type UserForAdminCard = Prisma.UserGetPayload<
  typeof adminUserCardValidator
>;

export type MessageForCard = Prisma.ChatMessageGetPayload<
  typeof messageValidator
>;

export type SessionPayload = {
  user: {
    id: string;
    name: string;
    image: string;
  };
};
