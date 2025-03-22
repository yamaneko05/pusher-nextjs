import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import FriendRequestCard from "../card/friend-request-card";

export default async function FriendRequestList({
  userId,
}: {
  userId: string;
}) {
  const friendRequestRepository = new FriendRequestRepository();
  const friendRequests =
    await friendRequestRepository.getPendingRequests(userId);

  return (
    <div className="">
      {friendRequests.map((friendRequest) => (
        <FriendRequestCard
          key={friendRequest.id}
          friendRequest={friendRequest}
        />
      ))}
    </div>
  );
}
