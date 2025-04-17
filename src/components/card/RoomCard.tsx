import Link from "next/link";
import { dayjsInstance } from "@/libs/dayjs";
import { RoomForCard } from "@/utils/types";

export default function RoomCard({ room }: { room: RoomForCard }) {
  return (
    <Link href={`/chat-rooms/${room.id}`}>
      <div className="py-2">
        <div className="font-bold">{room.name}</div>
        <div className="text-sm text-neutral-500">
          {room.chatMessages[0]
            ? `${room.chatMessages[0].user.name} : ${room.chatMessages[0].text} ${dayjsInstance(room.chatMessages[0].createdAt).fromNow()}`
            : "メッセージがありません"}
        </div>
      </div>
    </Link>
  );
}
