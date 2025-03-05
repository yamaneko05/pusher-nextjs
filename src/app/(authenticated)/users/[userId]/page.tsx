import ChatRoomCard from "@/components/chat-room-card";
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
    <>
      <PageHeading>ユーザー: {user.name}</PageHeading>
      <div className="mt-4 text-gray-500 text-sm">
        <div>ID: {user.id}</div>
        <div>メールアドレス: {user.email}</div>
      </div>
      <div className="mt-4 flex flex-col">
        {user.chatRooms.map((chatRoom) => (
          <ChatRoomCard key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </div>
    </>
  );
}
