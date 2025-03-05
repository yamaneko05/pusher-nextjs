import PageHeading from "@/components/page-heading";
import { getChatRoom } from "@/utils/db";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ chatRoomId: string }>;
}) {
  const { chatRoomId } = await params;
  const chatRoom = await getChatRoom(chatRoomId);

  if (!chatRoom) {
    notFound();
  }

  return (
    <>
      <PageHeading>チャットルーム: {chatRoom.name}</PageHeading>
    </>
  );
}
