import "server-only";
import prisma from "./prisma";
import { chatRoomWithMessages, chatRoomWithOwner } from "./prisma-validator";

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
    include: chatRoomWithMessages.include,
  });

  return chatRoom;
}
