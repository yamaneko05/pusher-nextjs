import Link from "next/link";
import { dayjsInstance } from "@/utils/dayjs";
import UserCard from "./user-card";
import { RoomWithOwner } from "@/utils/prisma-validator";

export default function RoomCard({ room }: { room: RoomWithOwner }) {
  return (
    <div className="flex flex-col gap-1">
      <Link href={`/chat-rooms/${room.id}`}>
        <div className="text-lg font-bold">{room.name}</div>
      </Link>
      <UserCard user={room.owner} />
      <div className="text-neutral-500 text-sm">
        作成日時: {dayjsInstance(room.createdAt).fromNow()}
      </div>
    </div>
  );
}
