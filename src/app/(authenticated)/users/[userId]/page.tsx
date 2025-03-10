import ChatRoomCard from "@/components/room-card";
import PageHeading from "@/components/page-heading";
import { getUser } from "@/utils/db";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUser(userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="p-3 pb-24">
      <PageHeading>ユーザー: {user.name}</PageHeading>
      <div className="mt-4 text-neutral-500 text-sm">
        <div>ID: {user.id}</div>
        <div>メールアドレス: {user.email}</div>
      </div>
      <div className="mt-4 flex flex-col">
        {user.chatRooms.map((chatRoom) => (
          <ChatRoomCard key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </div>
    </div>
  );
}
