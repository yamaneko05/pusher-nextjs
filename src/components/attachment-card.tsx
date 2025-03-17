import { getPublicUrl } from "@/utils/storage";
import { ChatMessageAttachment } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function AttachmentCard({
  attachment,
}: {
  attachment: ChatMessageAttachment;
}) {
  const src = getPublicUrl("chat-message-attachments", attachment.path);
  return (
    <Link href={src} target="_blank">
      <Image
        src={src}
        alt=""
        fill
        className="relative! aspect-square w-auto! object-cover"
      />
    </Link>
  );
}
