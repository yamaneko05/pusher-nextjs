import { UserRepository } from "@/repositories/UserRepository";
import UserCard from "../card/user-card";
import EmptyArray from "../emptyArray";

export default async function FriendList({ userId }: { userId: string }) {
  const userRepository = new UserRepository();
  const friends = await userRepository.getFriends(userId);

  return (
    <div className="">
      {friends.length ? (
        friends.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <EmptyArray
          title="友達がいません"
          description="ユーザー検索から友達を探して友達申請してください"
        />
      )}
    </div>
  );
}
