import Link from "next/link";
import { dayjsInstance } from "@/utils/dayjs";
import { RoomValidator } from "@/utils/prisma-validator";
import Image from "next/image";
import { getPublicUrl } from "@/utils/storage";

export default function RoomCard({ room }: { room: RoomValidator }) {
  return (
    <Link href={`/chat-rooms/${room.id}`} className="flex items-center gap-3">
      <Image
        src={getPublicUrl("avatars", room.owner.image!)}
        width={300}
        height={300}
        alt=""
        className="size-12 rounded-full"
      />
      <div className="flex flex-col gap-0.5">
        <div className="text-lg font-bold">{room.name}</div>
        <div className="text-neutral-500">
          {room.chatMessages[0]
            ? `${room.chatMessages[0].user.name} : ${room.chatMessages[0].text} ${dayjsInstance(room.chatMessages[0].createdAt).fromNow()}`
            : "メッセージがありません"}
        </div>
      </div>
    </Link>
  );
}
