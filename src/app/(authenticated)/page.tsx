import SizingImage from "@/components/sizing-image";
import { storage } from "@/utils/storage";
// import { redirect } from "next/navigation";

export default async function Home() {
  // redirect("/chat-rooms");
  const files = await storage.getAll("chat-message-attachments");

  if (!files) {
    throw new Error();
  }

  return (
    <>
      {files.map((file) => (
        <SizingImage
          key={file.id}
          imgSrc={storage.getPublicUrl("chat-message-attachments", file.name)}
        />
      ))}
    </>
  );
}
