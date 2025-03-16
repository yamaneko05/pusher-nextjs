import MessageList from "@/components/message-list";
import CreateMessageForm from "@/components/create-message-form";
import { notFound } from "next/navigation";
import { chatRoomWithMessages } from "@/utils/prisma-validator";
import prisma from "@/utils/prisma";
import PageHeader from "@/components/layout/page-header";

export default async function Page({
  params,
}: {
  params: Promise<{ chatRoomId: string }>;
}) {
  const { chatRoomId } = await params;

  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id: chatRoomId },
    ...chatRoomWithMessages,
  });

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
