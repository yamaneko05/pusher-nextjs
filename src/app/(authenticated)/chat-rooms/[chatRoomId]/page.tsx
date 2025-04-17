import MessageList from "@/components/list/MessageList";
import CreateMessageForm from "@/components/form/CreateMessageForm";
import { notFound } from "next/navigation";
import { RoomRepository } from "@/repositories/RoomRepository";
import RoomHeader from "@/components/layout/RoomHeader";

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
      <RoomHeader
        id={chatRoom.id}
        name={chatRoom.name}
        members={chatRoom.members}
      />
      <MessageList messages={chatRoom.chatMessages} chatRoomId={chatRoom.id} />
      <CreateMessageForm chatRoomId={chatRoom.id} />
    </div>
  );
}
