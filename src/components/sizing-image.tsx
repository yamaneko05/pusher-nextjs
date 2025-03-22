"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";

function optimizeImageSize(
  naturalWidth: number,
  naturalHeight: number,
  square: number,
) {
  const a = Math.sqrt(square / (naturalWidth * naturalHeight));

  const width = naturalWidth * a;
  const height = naturalHeight * a;

  return { width, height };
}

export default function SizingImage({ imgSrc }: { imgSrc: string }) {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const optimized = optimizeImageSize(
        img.naturalWidth,
        img.naturalHeight,
        320 * 240,
      );

      setWidth(optimized.width);
      setHeight(optimized.height);
      setLoading(false);
    };
    img.src = imgSrc;
  }, [imgSrc]);

  return loading ? (
    "loading"
  ) : (
    <NextImage src={imgSrc} alt="" width={width} height={height} />
  );
}
