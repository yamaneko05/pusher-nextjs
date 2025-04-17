import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import FriendRequestCard from "../card/FriendRequestCard";
import NoRequests from "../alert/NoRequests";

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
      {friendRequests.length ? (
        friendRequests.map((friendRequest) => (
          <FriendRequestCard
            key={friendRequest.sender.id}
            friendRequest={friendRequest}
          />
        ))
      ) : (
        <NoRequests />
      )}
    </div>
  );
}
