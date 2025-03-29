import MessageList from "@/components/list/MessageList";
import CreateMessageForm from "@/components/form/CreateMessageForm";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { RoomRepository } from "@/repositories/RoomRepository";

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

  return (
    <div className="flex h-screen flex-col">
      <PageHeader>チャットルーム: {chatRoom.name}</PageHeader>
      <MessageList messages={chatRoom.chatMessages} chatRoomId={chatRoom.id} />
      <CreateMessageForm chatRoomId={chatRoom.id} />
    </div>
  );
}
