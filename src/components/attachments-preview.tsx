import { transformMultipleFileInput } from "@/utils/definitions";
import { LucideLoader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AttachmentsPreview({
  attachments,
}: {
  attachments?: unknown;
}) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const transformed = transformMultipleFileInput(attachments);
    setFiles(transformed);
  }, [attachments]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {files.map((file, i) => (
        <AttachmentPreviewCard key={i} file={file} />
      ))}
    </div>
  );
}

function AttachmentPreviewCard({ file }: { file: File }) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return src ? (
    <Image
      src={src}
      alt=""
      width={240}
      height={240}
      className="aspect-square object-cover"
    />
  ) : (
    <LucideLoader2 className="animate-spin" />
  );
}
