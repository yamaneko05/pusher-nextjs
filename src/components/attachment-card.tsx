import { storage } from "@/utils/storage";
import { AttachmentForCard } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function AttachmentCard({
  attachment,
}: {
  attachment: AttachmentForCard;
}) {
  const src = storage.getPublicUrl("chat-message-attachments", attachment.path);
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
