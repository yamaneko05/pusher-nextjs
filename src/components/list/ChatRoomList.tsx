import RoomCard from "@/components/card/RoomCard";
import { RoomRepository } from "@/repositories/RoomRepository";

export default async function ChatRoomList() {
  const roomRepository = new RoomRepository();
  const rooms = await roomRepository.getAll();

  return (
    <div className="">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
