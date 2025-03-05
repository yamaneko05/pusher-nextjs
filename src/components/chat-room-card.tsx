import Link from "next/link";
import { dayjsInstance } from "@/utils/dayjs";
import UserCard from "./user-card";
import { ChatRoomWithOwner } from "@/utils/prisma-validator";

export default function ChatRoomCard({
  chatRoom,
}: {
  chatRoom: ChatRoomWithOwner;
}) {
  return (
    <div className="flex flex-col gap-2">
      <UserCard user={chatRoom.owner} />
      <Link href={`/chat-rooms/${chatRoom.id}`}>
        <div className="text-lg font-bold">{chatRoom.name}</div>
      </Link>
      <div className="text-gray-500 text-sm">
        作成日時: {dayjsInstance(chatRoom.createdAt).fromNow()}
      </div>
    </div>
  );
}
