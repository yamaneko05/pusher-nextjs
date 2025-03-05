import "server-only";
import prisma from "./prisma";
import { getSessionPayload } from "./session";
import { chatRoomWithMessages, chatRoomWithOwner } from "./prisma-validator";

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

export async function getUser(id: string) {
  const user = prisma.user.findUnique({
    where: { id },
    include: { chatRooms: chatRoomWithOwner },
  });

  return user;
}

export async function getChatRooms() {
  const chatRooms = await prisma.chatRoom.findMany({ ...chatRoomWithOwner });
  return chatRooms;
}

export async function getChatRoom(id: string) {
  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id },
    include: {
      ...chatRoomWithOwner.include,
      ...chatRoomWithMessages.include,
    },
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
