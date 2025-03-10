import ChatRoomCard from "@/components/room-card";
import PageHeading from "@/components/page-heading";
import prisma from "@/utils/prisma";
import { chatRoomWithOwner } from "@/utils/prisma-validator";

export default async function Page() {
  const chatRooms = await prisma.chatRoom.findMany({ ...chatRoomWithOwner });

  return (
    <div className="p-3 pb-24">
      <PageHeading>チャットルーム一覧</PageHeading>
      <div className="mt-4 flex flex-col gap-6">
        {chatRooms.map((chatRoom) => (
          <ChatRoomCard key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </div>
    </div>
  );
}
