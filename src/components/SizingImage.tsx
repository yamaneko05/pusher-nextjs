import { getOptimizeImageSize } from "@/utils/image-client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SizingImage({ src }: { src: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  const [width, setWidth] = useState<number>(320);
  const [height, setHeight] = useState<number>(240);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => {
        const naturalWidth = imageRef.current!.naturalWidth;
        const naturalHeight = imageRef.current!.naturalHeight;
        console.log(naturalHeight, naturalWidth);
        const { width, height } = getOptimizeImageSize(
          naturalWidth,
          naturalHeight,
          320 * 240,
        );
        setWidth(width);
        setHeight(height);
      };
    }
  }, []);

  return (
    <Image
      ref={imageRef}
      src={src}
      alt=""
      width={width}
      height={height}
      className="rounded-xl"
    />
  );
}
