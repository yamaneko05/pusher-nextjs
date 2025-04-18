"use server";

import { FriendRequestService } from "@/services/FriendRequestService";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { revalidatePath } from "next/cache";

export async function sendFriendRequestAction(receiverId: string) {
  const payload = await getSessionPayloadOrUnauthorized();

  const friendRequestService = new FriendRequestService();
  await friendRequestService.send(payload.user.id, receiverId);

  revalidatePath("/users");
}

export async function acceptFriendRequestAction(senderId: string) {
  const payload = await getSessionPayloadOrUnauthorized();

  const friendRequestService = new FriendRequestService();
  await friendRequestService.accept(senderId, payload.user.id);

  revalidatePath("/friends");
}

export async function rejectFriendRequestAction(senderId: string) {
  const payload = await getSessionPayloadOrUnauthorized();

  const friendRequestService = new FriendRequestService();
  await friendRequestService.reject(senderId, payload.user.id);

  revalidatePath("/friends");
}
