"use server";

import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { FriendRequestService } from "@/services/FriendRequestService";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { revalidatePath } from "next/cache";

export async function sendFriendRequestAction(receiverId: string) {
  const friendRequestRepository = new FriendRequestRepository();
  const friendRequestService = new FriendRequestService(
    friendRequestRepository,
  );
  await friendRequestService.send(receiverId);

  revalidatePath("/users");
}

export async function acceptFriendRequestAction(senderId: string) {
  const payload = await getSessionPayloadOrUnauthorized();

  const friendRequestRepository = new FriendRequestRepository();
  const friendRequestService = new FriendRequestService(
    friendRequestRepository,
  );
  await friendRequestService.accept(senderId, payload.user.id);

  revalidatePath("/friends");
}

export async function rejectFriendRequestAction(senderId: string) {
  const payload = await getSessionPayloadOrUnauthorized();

  const friendRequestRepository = new FriendRequestRepository();
  const friendRequestService = new FriendRequestService(
    friendRequestRepository,
  );
  await friendRequestService.reject(senderId, payload.user.id);

  revalidatePath("/friends");
}
