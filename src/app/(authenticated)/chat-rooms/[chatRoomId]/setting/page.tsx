import UserCard from "@/components/card/UserCard";
import UpdateRoomForm from "@/components/form/UpdateRoomForm";
import HeaderBase from "@/components/layout/HeaderBase";
import SectionHeading from "@/components/SectionHeading";
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
  const room = await roomRepository.getById(chatRoomId);

  if (!room) {
    notFound();
  }

  const handleDeleteButtonClick = async () => {
    "use server";

    const roomService = new RoomService();
    await roomService.delete(room.id);

    redirect("/chat-rooms");
  };

  return (
    <>
      <HeaderBase>
        <span className="font-bold">チャットルーム設定: {room.name}</span>
      </HeaderBase>
      <div className="max-w-96 p-3 pb-24">
        <div>
          <SectionHeading>基本情報</SectionHeading>
          <div className="mt-3">
            <UpdateRoomForm room={room!} />
          </div>
        </div>
        <div className="mt-6">
          <SectionHeading>メンバー</SectionHeading>
          <div className="mt-3">
            {room.members.map((member) => (
              <UserCard key={member.id} user={member} />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <SectionHeading>その他</SectionHeading>
          <div className="mt-3">
            <Button variant={"destructive"} onClick={handleDeleteButtonClick}>
              チャットルームを削除
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
