import RoomCard from "@/components/card/room-card";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/page-header";
import Bottombar from "@/components/layout/bottombar";
import { UserRepository } from "@/repositories/UserRepository";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(userId);

  if (!user) {
    notFound();
  }

  return (
    <>
      <PageHeader pageHeading={`ユーザー: ${user.name}`} prevHref="/" />
      <div className="p-3 pb-24">
        <div className="text-sm text-neutral-500">
          <div>ID: {user.id}</div>
          <div>メールアドレス: {user.email}</div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {user.chatRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      <Bottombar />
    </>
  );
}
