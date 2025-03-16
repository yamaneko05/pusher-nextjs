import UserCard from "@/components/admin-user-card";
import prisma from "@/utils/prisma";
import PageHeader from "@/components/layout/page-header";
import Bottombar from "@/components/layout/bottombar";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <>
      <PageHeader pageHeading="ユーザー管理" prevHref="/" />
      <div className="p-3 pb-24">
        <div className="flex flex-col gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      <Bottombar />
    </>
  );
}
