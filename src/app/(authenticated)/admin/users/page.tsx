import PageHeading from "@/components/page-heading";
import UserCard from "@/components/admin-user-card";
import { getUsers } from "@/utils/db";

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <PageHeading>ユーザー管理</PageHeading>
      <div className="mt-4 flex flex-col">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
