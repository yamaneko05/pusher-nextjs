import RoomCard from "@/components/room-card";
import prisma from "@/utils/prisma";
import { roomValidator } from "@/utils/prisma-validator";
import PageHeader from "@/components/layout/page-header";
import Bottombar from "@/components/layout/bottombar";

export default async function Page() {
  const rooms = await prisma.chatRoom.findMany(roomValidator);

  return (
    <>
      <PageHeader pageHeading="チャットルーム一覧" prevHref="/" />
      <div className="p-3 pb-24">
        <div className="flex flex-col gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      <Bottombar />
    </>
  );
}
