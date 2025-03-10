import {
  ChatMessageWithAttachments,
  ChatMessageWithUser,
} from "@/utils/prisma-validator";
import { dayjsInstance } from "@/utils/dayjs";
import Link from "next/link";
import Image from "next/image";
import { getPublicUrl } from "@/utils/storage";
import { deleteMessageAction } from "@/actions/message-actions";
import AttachmentCard from "./attachment-card";

export default function ChatMessageCard({
  chatMessage,
}: {
  chatMessage: ChatMessageWithUser & ChatMessageWithAttachments;
}) {
  const handleDeleteClick = async () => {
    await deleteMessageAction(chatMessage.id, chatMessage.chatRoomId);
  };

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
        <div className="flex items-end gap-1">
          <div>
            <div className="bg-neutral-100 py-1.5 px-3 rounded-xl rounded-tl-none max-w-96 w-fit whitespace-pre-wrap">
              {chatMessage.text}
            </div>
            {chatMessage.attachments?.map((attachment) => (
              <AttachmentCard key={attachment.id} attachment={attachment} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-xs">
            <div className="">
              {dayjsInstance(chatMessage.createdAt).fromNow()}
            </div>
            <button
              onClick={handleDeleteClick}
              className="hover:cursor-pointer underline"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
