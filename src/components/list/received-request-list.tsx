import UserCard from "../user-card";
import { FriendRequestRepository } from "@/repositories/FriendRequestRepository";

export default async function FriendList({ userId }: { userId: string }) {
  const friendRequestRepository = new FriendRequestRepository();
  const receivedRequests =
    await friendRequestRepository.findManyByReceiverId(userId);

  return (
    <div className="flex flex-col gap-4">
      {receivedRequests.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
