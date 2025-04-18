import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import FriendRequestCard from "../card/FriendRequestCard";
import NoRequests from "../alert/NoRequests";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";

export default async function FriendRequestList() {
  const payload = await getSessionPayloadOrUnauthorized();

  const friendRequestRepository = new FriendRequestRepository();
  const friendRequests = await friendRequestRepository.getPendingRequests(
    payload.user.id,
  );

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
