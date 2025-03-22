import MessageList from "@/components/list/message-list";
import CreateMessageForm from "@/components/form/create-message-form";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/page-header";
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
      <PageHeader
        pageHeading={`チャットルーム: ${chatRoom.name}`}
        prevHref={"/chat-rooms"}
      />
      <MessageList messages={chatRoom.chatMessages} chatRoomId={chatRoom.id} />
      <CreateMessageForm chatRoomId={chatRoom.id} />
    </div>
  );
}
