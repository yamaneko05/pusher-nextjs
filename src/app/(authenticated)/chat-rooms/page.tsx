import ChatRoomCard from "@/components/chat-room-card";
import PageHeading from "@/components/page-heading";
import { getChatRooms } from "@/utils/db";

export default async function Page() {
  const chatRooms = await getChatRooms();

  return (
    <>
      <PageHeading>チャットルーム一覧</PageHeading>
      <div className="mt-4 flex flex-col">
        {chatRooms.map((chatRoom) => (
          <ChatRoomCard key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </div>
    </>
  );
}
