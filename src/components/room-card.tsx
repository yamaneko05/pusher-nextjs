import Link from "next/link";
import { dayjsInstance } from "@/utils/dayjs";
import { RoomValidator } from "@/utils/prisma-validator";
import Image from "next/image";
import { getPublicUrl } from "@/utils/storage";

export default function RoomCard({ room }: { room: RoomValidator }) {
  return (
    <Link href={`/chat-rooms/${room.id}`} className="pt-1 flex gap-2">
      <Image
        src={getPublicUrl("avatars", room.owner.image!)}
        width={300}
        height={300}
        alt=""
        className="size-8 rounded-full"
      />
      <div className="flex flex-col gap-1">
        <div className="text font-bold">{room.name}</div>
        {room.chatMessages[0] ? (
          <div className="text-neutral-500 text-sm flex gap-2">
            <span>{room.chatMessages[0]?.text}</span>
            <span>
              {dayjsInstance(room.chatMessages[0]?.createdAt).fromNow()}
            </span>
          </div>
        ) : (
          <div className="text-neutral-500 text-sm">メッセージがありません</div>
        )}
      </div>
    </Link>
  );
}
