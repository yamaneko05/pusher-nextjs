import prisma from "@/utils/prisma";
import { roomValidator } from "@/utils/prisma-validator";
import RoomCard from "./room-card";

export default async function ChatRoomList() {
  const rooms = await prisma.chatRoom.findMany(roomValidator);

  return (
    <div className="flex flex-col gap-6 p-3 pb-24">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
