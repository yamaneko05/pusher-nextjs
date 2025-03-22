import RoomCard from "@/components/card/room-card";
import { RoomRepository } from "@/repositories/RoomRepository";

export default async function ChatRoomList() {
  const roomRepository = new RoomRepository();
  const rooms = await roomRepository.getAll();

  return (
    <div className="flex flex-col p-3 pb-24">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
