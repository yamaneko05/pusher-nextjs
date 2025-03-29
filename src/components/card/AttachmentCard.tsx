import { storage } from "@/utils/storage";
import { AttachmentBase } from "@/utils/types";
import Link from "next/link";
import SizingImage from "../SizingImage";

export default function AttachmentCard({
  attachment,
}: {
  attachment: AttachmentBase;
}) {
  return (
    <Link
      href={storage.getPublicUrl("chat-message-attachments", attachment.path)}
      target="_blank"
    >
      <SizingImage
        src={storage.getPublicUrl("chat-message-attachments", attachment.path)}
      />
    </Link>
  );
}
