import { dayjsInstance } from "@/libs/dayjs";
import Link from "next/link";
import Image from "next/image";
import { storage } from "@/utils/storage";
import { deleteMessageAction } from "@/actions/message-actions";
import AttachmentCard from "./attachment-card";
import { MessageForCard } from "@/utils/types";

export default function MessageCard({ message }: { message: MessageForCard }) {
  const handleDeleteClick = async () => {
    await deleteMessageAction(message.id, message.chatRoomId);
  };

  return (
    <div className="flex gap-3">
      <Link href={`/users/${message.user.id}`} className="pt-1">
        <Image
          src={storage.getPublicUrl("avatars", message.user.image)}
          alt=""
          fill
          className="relative! size-10! rounded-full"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-bold">{message.user.name}</div>
        <div className="flex items-end gap-1">
          <div>
            <div className="w-fit max-w-96 rounded-xl rounded-tl-none bg-neutral-100 px-3 py-1.5 whitespace-pre-wrap">
              {message.text}
            </div>
            {message.attachments && (
              <div
                className={`grid max-w-96 gap-1 [clip-path:inset(0_0_0_0_round_16px)] ${message.attachments.length > 1 && "grid-cols-2"}`}
              >
                {message.attachments?.map((attachment) => (
                  <AttachmentCard key={attachment.id} attachment={attachment} />
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <div className="">{dayjsInstance(message.createdAt).fromNow()}</div>
            <button
              onClick={handleDeleteClick}
              className="underline hover:cursor-pointer"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
