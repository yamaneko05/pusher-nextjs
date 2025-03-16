import { MessageValidator } from "@/utils/prisma-validator";
import { dayjsInstance } from "@/utils/dayjs";
import Link from "next/link";
import Image from "next/image";
import { getPublicUrl } from "@/utils/storage";
import { deleteMessageAction } from "@/actions/message-actions";
import AttachmentCard from "./attachment-card";

export default function MessageCard({
  message,
}: {
  message: MessageValidator;
}) {
  const handleDeleteClick = async () => {
    await deleteMessageAction(message.id, message.chatRoomId);
  };

  return (
    <div className="flex gap-2">
      <Link href={`/users/${message.user.id}`} className="pt-1">
        <Image
          src={getPublicUrl("avatars", message.user.image!)}
          width={300}
          height={300}
          alt=""
          className="size-8 rounded-full"
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
              <div className="grid max-w-96 grid-cols-2 gap-1 [clip-path:inset(0_0_0_0_round_16px)]">
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
