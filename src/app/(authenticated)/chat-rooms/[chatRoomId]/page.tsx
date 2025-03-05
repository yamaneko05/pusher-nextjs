import PageHeading from "@/components/page-heading";
import UserCard from "@/components/user-card";
import { dayjsInstance } from "@/utils/dayjs";
import { getChatRoom } from "@/utils/db";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ chatRoomId: string }>;
}) {
  const { chatRoomId } = await params;
  const chatRoom = await getChatRoom(chatRoomId);

  if (!chatRoom) {
    notFound();
  }

  return (
    <>
      <PageHeading>チャットルーム: {chatRoom.name}</PageHeading>
      <div className="mt-4">
        <UserCard user={chatRoom.owner} />
        <div className="text-gray-500 text-sm mt-2">
          作成日時: {dayjsInstance(chatRoom.createdAt).fromNow()}
        </div>
      </div>
      <div className="mt-4">
        {chatRoom.chatMessages.map((chatMessage) => (
          <div key={chatMessage.id}>{chatMessage.text}</div>
        ))}
      </div>
    </>
  );
}
