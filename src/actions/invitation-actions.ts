"use server";

import prisma from "@/libs/prisma";
import { RoomRepository } from "@/repositories/RoomRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function acceptInvitationAction(
  chatRoomId: string,
  senderId: string,
) {
  const payload = await getSessionPayloadOrUnauthorized();

  const roomRepository = new RoomRepository();
  await roomRepository.addMember(chatRoomId, payload.user.id);

  await prisma.chatRoomInvitation.update({
    where: {
      chatRoomId_senderId_receiverId: {
        chatRoomId,
        senderId,
        receiverId: payload.user.id,
      },
    },
    data: {
      status: "ACCEPTED",
    },
  });

  redirect(`/chat-rooms/${chatRoomId}`);
}

export async function rejectInvitationAction(
  chatRoomId: string,
  senderId: string,
) {
  const payload = await getSessionPayloadOrUnauthorized();

  await prisma.chatRoomInvitation.update({
    where: {
      chatRoomId_senderId_receiverId: {
        chatRoomId,
        senderId,
        receiverId: payload.user.id,
      },
    },
    data: {
      status: "REJECTED",
    },
  });

  revalidatePath("/chat-rooms");
}
