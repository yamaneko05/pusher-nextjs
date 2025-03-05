import "server-only";
import prisma from "./prisma";
import { getSessionPayload } from "./session";
import { Prisma } from "@prisma/client";

export async function createUser(
  name: string,
  email: string,
  passwordHash: string,
  imagePath: string
) {
  const user = await prisma.user.create({
    data: { name, email, password: passwordHash, image: imagePath },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  });
}

const chatRoomWithOwner = Prisma.validator<Prisma.ChatRoomDefaultArgs>()({
  include: { owner: true },
});

export type ChatRoomWithOwner = Prisma.ChatRoomGetPayload<
  typeof chatRoomWithOwner
>;

export async function getChatRooms() {
  const chatRooms = await prisma.chatRoom.findMany({ ...chatRoomWithOwner });
  return chatRooms;
}

export async function getChatRoom(id: string) {
  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id },
    ...chatRoomWithOwner,
  });

  return chatRoom;
}

export async function createChatRoom(name: string) {
  const payload = await getSessionPayload();
  if (!payload) {
    throw new Error("unauthorized");
  }

  const chatRoom = await prisma.chatRoom.create({
    data: {
      name,
      ownerId: payload.user.id,
    },
  });

  return chatRoom;
}
