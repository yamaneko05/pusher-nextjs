"use server";

import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import { FriendRequestService } from "@/services/FriendRequestService";
import { revalidatePath } from "next/cache";

export async function sendFriendRequestAction(receiverId: string) {
  const friendRequestRepository = new FriendRequestRepository();
  const friendRequestService = new FriendRequestService(
    friendRequestRepository,
  );
  await friendRequestService.send(receiverId);

  revalidatePath("/users");
}
