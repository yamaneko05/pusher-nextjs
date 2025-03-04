import "server-only";
import sharp from "sharp";

export async function resizeImage(input: Buffer | ArrayBuffer) {
  const resized = await sharp(input)
    .resize({
      width: 300,
      height: 300,
      fit: "cover",
    })
    .webp()
    .toBuffer();

  return resized;
}
