import { chatMessageWithUser } from "@/utils/prisma-validator";
import { dayjsInstance } from "@/utils/dayjs";
import Link from "next/link";
import Image from "next/image";
import { getPublicUrl } from "@/utils/storage";

export default function ChatMessageCard({
  chatMessage,
}: {
  chatMessage: chatMessageWithUser;
}) {
  return (
    <div className="flex gap-2">
      <Link href={`/users/${chatMessage.user.id}`} className="pt-1">
        <Image
          src={getPublicUrl("avatars", chatMessage.user.image!)}
          width={300}
          height={300}
          alt=""
          className="size-8 rounded-full"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-bold">{chatMessage.user.name}</div>
        <div className="bg-neutral-100 py-2 px-4 rounded-xl rounded-tl-none max-w-96 w-fit">
          {chatMessage.text}
        </div>
        <div className="text-neutral-500 text-xs">
          {dayjsInstance(chatMessage.createdAt).fromNow()}
        </div>
      </div>
    </div>
  );
}
