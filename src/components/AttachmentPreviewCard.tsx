import { LucideLoader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function AttachmentPreviewCard({ file }: { file: File }) {
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
      fill
      className="relative! aspect-square rounded-lg object-cover"
    />
  ) : (
    <div className="flex justify-center">
      <LucideLoader2 className="animate-spin" />
    </div>
  );
}
