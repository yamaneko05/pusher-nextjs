import { ChatRoomWithOwner } from "@/utils/db";
import Link from "next/link";
import Image from "next/image";
import { getPublicUrl } from "@/utils/storage";
import { dayjsInstance } from "@/utils/dayjs";

export default function ChatRoomCard({
  chatRoom,
}: {
  chatRoom: ChatRoomWithOwner;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/users/${chatRoom.owner.id}`}
        className="flex items-center gap-2"
      >
        <Image
          src={getPublicUrl("avatars", chatRoom.owner.image!)}
          width={300}
          height={300}
          alt=""
          className="size-8 rounded-full"
        />
        <div className="text-sm">{chatRoom.owner.name}</div>
      </Link>
      <Link href={`/chat-rooms/${chatRoom.id}`}>
        <div className="text-lg font-bold">{chatRoom.name}</div>
      </Link>
      <div className="text-gray-500 text-sm">
        作成日時: {dayjsInstance(chatRoom.createdAt).fromNow()}
      </div>
    </div>
  );
}
