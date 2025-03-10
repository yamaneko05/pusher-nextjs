import RoomCard from "@/components/room-card";
import PageHeading from "@/components/page-heading";
import prisma from "@/utils/prisma";
import { roomValidator } from "@/utils/prisma-validator";

export default async function Page() {
  const rooms = await prisma.chatRoom.findMany(roomValidator);

  return (
    <div className="p-3 pb-24">
      <PageHeading>チャットルーム一覧</PageHeading>
      <div className="mt-4 flex flex-col gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
