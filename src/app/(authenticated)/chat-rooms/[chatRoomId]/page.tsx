import ChatMessageList from "@/components/chat-message-list";
import CreateChatMessageForm from "@/components/create-chat-message-form";
import PageHeading from "@/components/page-heading";
import { dayjsInstance } from "@/utils/dayjs";
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
    <div className="h-screen flex flex-col">
      <div className="p-3 border-b">
        <PageHeading>チャットルーム: {chatRoom.name}</PageHeading>
        <div className="text-neutral-500 text-xs mt-2">
          作成日時: {dayjsInstance(chatRoom.createdAt).fromNow()}
        </div>
      </div>
      <ChatMessageList chatMessages={chatRoom.chatMessages} />
      <div className="border-t p-3">
        <CreateChatMessageForm chatRoomId={chatRoom.id} />
      </div>
    </div>
  );
}
