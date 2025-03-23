import { UserRepository } from "@/repositories/UserRepository";
import UserCard from "../card/user-card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default async function FriendList({ userId }: { userId: string }) {
  const userRepository = new UserRepository();
  const friends = await userRepository.getFriends(userId);

  return (
    <div className="">
      {friends.length ? (
        friends.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <Alert>
          <AlertTitle>友達がいません</AlertTitle>
          <AlertDescription>
            ユーザー検索から友達を探して友達申請してください
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
