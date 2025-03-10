import PageHeading from "@/components/page-heading";
import UserCard from "@/components/admin-user-card";
import prisma from "@/utils/prisma";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-3 pb-24">
      <PageHeading>ユーザー管理</PageHeading>
      <div className="mt-4 flex flex-col">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
