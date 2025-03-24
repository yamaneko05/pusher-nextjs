import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";
import FriendRequestCard from "../card/friend-request-card";
import EmptyArray from "../emptyArray";

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
            key={friendRequest.id}
            friendRequest={friendRequest}
          />
        ))
      ) : (
        <EmptyArray
          title="受け取った申請はありません"
          description="友達にユーザー名を教えて申請してもらいましょう"
        />
      )}
    </div>
  );
}
