import { UserRepository } from "@/repositories/UserRepository";
import UserCard from "../card/UserCard";
import NoFriends from "../alert/NoFriends";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";

export default async function FriendList() {
  const payload = await getSessionPayloadOrUnauthorized();

  const userRepository = new UserRepository();
  const friends = await userRepository.getFriends(payload.user.id);

  return friends.length ? (
    <>
      {friends.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  ) : (
    <NoFriends />
  );
}
