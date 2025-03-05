import ChatMessageCard from "@/components/chat-message-card";
import CreateChatMessageForm from "@/components/create-chat-message-form";
import PageHeading from "@/components/page-heading";
import UserCard from "@/components/user-card";
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
    <div className="h-screen flex flex-col justify-between">
      <div className="p-3 border-b">
        <PageHeading>チャットルーム: {chatRoom.name}</PageHeading>
        <div className="mt-4">
          <UserCard user={chatRoom.owner} />
          <div className="text-neutral-500 text-sm mt-2">
            作成日時: {dayjsInstance(chatRoom.createdAt).fromNow()}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-3 flex flex-col gap-4">
        {chatRoom.chatMessages.map((chatMessage) => (
          <ChatMessageCard key={chatMessage.id} chatMessage={chatMessage} />
        ))}
      </div>
      <div className="border-t p-3">
        <CreateChatMessageForm chatRoomId={chatRoom.id} />
      </div>
    </div>
  );
}
