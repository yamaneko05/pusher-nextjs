import { UserRepository } from "@/repositories/UserRepository";
import UserCard from "../card/user-card";

export default async function FriendList({ userId }: { userId: string }) {
  const userRepository = new UserRepository();
  const friends = await userRepository.getFriends(userId);

  return (
    <div className="flex flex-col gap-4">
      {friends.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
