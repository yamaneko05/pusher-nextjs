import { dayjsInstance } from "@/libs/dayjs";
import Link from "next/link";
import Image from "next/image";
import { storage } from "@/utils/storage";
// import { deleteMessageAction } from "@/actions/message-actions";
import AttachmentCard from "./attachment-card";
import { MessageForCard } from "@/utils/types";
import AttachmentsCard from "./attachments-card";

export default function MessageCard({ message }: { message: MessageForCard }) {
  // const handleDeleteClick = async () => {
  //   await deleteMessageAction(message.id, message.chatRoomId);
  // };

  return (
    <div className="flex gap-3">
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
        <div className="flex items-end gap-1">
          <div>
            <div className="w-fit max-w-96 rounded-xl rounded-tl-none bg-neutral-100 px-3 py-1 whitespace-pre-wrap">
              {message.text}
            </div>
            {!!message.attachments.length &&
              (message.attachments.length === 1 ? (
                <AttachmentCard attachment={message.attachments[0]} />
              ) : (
                <AttachmentsCard attachments={message.attachments} />
              ))}
          </div>
          <div className="w-12 text-xs text-neutral-500">
            {dayjsInstance(message.createdAt).fromNow()}
          </div>
          {/* <button
              onClick={handleDeleteClick}
              className="underline hover:cursor-pointer"
            >
              削除
            </button> */}
        </div>
      </div>
    </div>
  );
}
