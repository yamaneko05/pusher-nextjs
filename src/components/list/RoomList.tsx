import RoomCard from "@/components/card/RoomCard";
import { RoomRepository } from "@/repositories/RoomRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";

export default async function RoomList() {
  const payload = await getSessionPayloadOrUnauthorized();

  const roomRepository = new RoomRepository();
  const rooms = await roomRepository.getChatRooms(payload.user.id);

  return (
    <>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </>
  );
}
