import RoomCard from "@/components/room-card";
import { notFound } from "next/navigation";
import prisma from "@/utils/prisma";
import { roomValidator } from "@/utils/prisma-validator";
import PageHeader from "@/components/layout/page-header";
import Bottombar from "@/components/layout/bottombar";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { chatRooms: roomValidator },
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <PageHeader pageHeading={`ユーザー: ${user.name}`} prevHref="/" />
      <div className="p-3 pb-24">
        <div className="text-sm text-neutral-500">
          <div>ID: {user.id}</div>
          <div>メールアドレス: {user.email}</div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {user.chatRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      <Bottombar />
    </>
  );
}
