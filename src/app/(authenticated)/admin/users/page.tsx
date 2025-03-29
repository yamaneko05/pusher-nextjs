import UserCard from "@/components/card/AdminUserCard";
import Bottombar from "@/components/layout/BottomBar";
import { UserRepository } from "@/repositories/UserRepository";
import SectionHeading from "@/components/SectionHeading";

export default async function Page() {
  const userRepository = new UserRepository();
  const users = await userRepository.getAll();

  return (
    <>
      <div className="p-3 pb-24">
        <SectionHeading>ユーザー管理</SectionHeading>
        <div className="mt-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      <Bottombar />
    </>
  );
}
