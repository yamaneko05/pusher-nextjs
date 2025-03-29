import { storage } from "@/utils/storage";
import { AttachmentBase } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

export default function AttachmentsCard({
  attachments,
}: {
  attachments: AttachmentBase[];
}) {
  return (
    <div
      className={`grid max-w-[320px] gap-1 [clip-path:inset(0_0_0_0_round_16px)] ${attachments.length > 1 && "grid-cols-2"}`}
    >
      {attachments?.map((attachment) => (
        <Link
          key={attachment.id}
          href={storage.getPublicUrl(
            "chat-message-attachments",
            attachment.path,
          )}
          target="_blank"
        >
          <Image
            src={storage.getPublicUrl(
              "chat-message-attachments",
              attachment.path,
            )}
            alt=""
            width={158}
            height={158}
            className="aspect-square object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
