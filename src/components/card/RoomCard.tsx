import Link from "next/link";
import { dayjsInstance } from "@/libs/dayjs";
import Image from "next/image";
import { storage } from "@/utils/storage";
import { RoomForCard } from "@/utils/types";

export default function RoomCard({ room }: { room: RoomForCard }) {
  return (
    <Link
      href={`/chat-rooms/${room.id}`}
      className="flex items-center gap-3 py-2"
    >
      <Image
        src={storage.getPublicUrl("avatars", room.owner.image)}
        alt=""
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex flex-col">
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
