import HeaderBase from "@/components/layout/HeaderBase";
import { Button } from "@/components/shadcn/button";
import { RoomRepository } from "@/repositories/RoomRepository";
import { RoomService } from "@/services/RoomService";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ chatRoomId: string }>;
}) {
  const { chatRoomId } = await params;

  const roomRepository = new RoomRepository();
  const chatRoom = await roomRepository.getWithMessages(chatRoomId);

  if (!chatRoom) {
    notFound();
  }

  const handleDeleteButtonClick = async () => {
    "use server";

    const roomRepository = new RoomRepository();
    const roomService = new RoomService(roomRepository);
    await roomService.delete(chatRoom.id);

    redirect("/chat-rooms");
  };

  return (
    <>
      <HeaderBase>
        <span className="font-bold">チャットルーム設定: {chatRoom.name}</span>
      </HeaderBase>
      <div className="p-3 pb-24">
        <Button variant={"destructive"} onClick={handleDeleteButtonClick}>
          チャットルームを削除
        </Button>
      </div>
    </>
  );
}
