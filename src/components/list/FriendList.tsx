import { UserRepository } from "@/repositories/UserRepository";
import UserCard from "../card/UserCard";
import NoFriends from "../alert/NoFriends";

export default async function FriendList({ userId }: { userId: string }) {
  const userRepository = new UserRepository();
  const friends = await userRepository.getFriends(userId);

  return (
    <div className="">
      {friends.length ? (
        friends.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <NoFriends />
      )}
    </div>
  );
}
