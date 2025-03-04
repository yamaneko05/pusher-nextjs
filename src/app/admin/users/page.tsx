import UserCard from "@/components/user-card";
import { getUsers } from "@/utils/db";

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <div className="text-2xl font-bold">ユーザー一覧</div>
      <div className="mt-4 flex flex-col">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
