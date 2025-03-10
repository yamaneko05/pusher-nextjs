import prisma from "@/utils/prisma";
import { getSessionPayload } from "@/utils/session";

export async function createRoomUsecase(name: string) {
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
