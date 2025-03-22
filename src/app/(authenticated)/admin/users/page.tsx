import UserCard from "@/components/card/admin-user-card";
import PageHeader from "@/components/layout/page-header";
import Bottombar from "@/components/layout/bottombar";
import { UserRepository } from "@/repositories/UserRepository";

export default async function Page() {
  const userRepository = new UserRepository();
  const users = await userRepository.getAll();

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
