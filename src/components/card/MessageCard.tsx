import { dayjsInstance } from "@/libs/dayjs";
import Link from "next/link";
import Image from "next/image";
import { storage } from "@/utils/storage";
import AttachmentCard from "./AttachmentCard";
import { MessageForCard } from "@/utils/types";
import AttachmentsCard from "./AttachmentsCard";
import { useContext } from "react";
import { SessionContext } from "@/utils/context";

export default function MessageCard({ message }: { message: MessageForCard }) {
  const session = useContext(SessionContext);
  const isMe = message.user.id === session!.user.id;

  return isMe ? (
    <MessageContent message={message} isMe />
  ) : (
    <div className="flex gap-2">
      <Link href={`/users/${message.user.id}`} className="pt-1">
        <Image
          src={storage.getPublicUrl("avatars", message.user.image)}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold text-gray-500">
          {message.user.name}
        </div>
        <MessageContent message={message} />
      </div>
    </div>
  );
}

function MessageContent({
  message,
  isMe,
}: {
  message: MessageForCard;
  isMe?: boolean;
}) {
  return (
    <div className={`flex items-end gap-2 ${isMe && "flex-row-reverse"}`}>
      <div className={`flex flex-col ${isMe && "items-end"}`}>
        <div
          className={`w-fit max-w-96 rounded-lg px-3.5 py-[5px] whitespace-pre-wrap ${isMe ? "bg-primary text-white" : "bg-secondary"}`}
        >
          {message.text}
        </div>
        {!!message.attachments.length &&
          (message.attachments.length === 1 ? (
            <AttachmentCard attachment={message.attachments[0]} />
          ) : (
            <AttachmentsCard attachments={message.attachments} />
          ))}
      </div>
      <div className="text-xs text-neutral-500">
        {dayjsInstance(message.createdAt).fromNow()}
      </div>
    </div>
  );
}
