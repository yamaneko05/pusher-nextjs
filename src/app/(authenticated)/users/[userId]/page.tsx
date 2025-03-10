import ChatRoomCard from "@/components/room-card";
import PageHeading from "@/components/page-heading";
import { notFound } from "next/navigation";
import prisma from "@/utils/prisma";
import { chatRoomWithOwner } from "@/utils/prisma-validator";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { chatRooms: chatRoomWithOwner },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="p-3 pb-24">
      <PageHeading>ユーザー: {user.name}</PageHeading>
      <div className="mt-4 text-neutral-500 text-sm">
        <div>ID: {user.id}</div>
        <div>メールアドレス: {user.email}</div>
      </div>
      <div className="mt-4 flex flex-col">
        {user.chatRooms.map((chatRoom) => (
          <ChatRoomCard key={chatRoom.id} chatRoom={chatRoom} />
        ))}
      </div>
    </div>
  );
}
