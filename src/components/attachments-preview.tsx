import { transformMultipleFileInput } from "@/utils/definitions";
import { useEffect, useState } from "react";
import { AttachmentPreviewCard } from "./attachments-preview-card";

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
    <div className="grid grid-cols-3 gap-2 md:grid-cols-6 xl:grid-cols-8">
      {files.map((file, i) => (
        <AttachmentPreviewCard key={i} file={file} />
      ))}
    </div>
  );
}
