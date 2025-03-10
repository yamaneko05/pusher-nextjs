import { getPublicUrl } from "@/utils/storage";
import { ChatMessageAttachment } from "@prisma/client";
import Image from "next/image";

export default function AttachmentCard({
  attachment,
}: {
  attachment: ChatMessageAttachment;
}) {
  return (
    <Image
      src={getPublicUrl("chat-message-attachments", attachment.path)}
      width={300}
      height={300}
      alt=""
      className="rounded-xl"
    />
  );
}
