import RoomCard from "@/components/card/room-card";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/page-header";
import Bottombar from "@/components/layout/bottombar";
import { UserRepository } from "@/repositories/UserRepository";
import Image from "next/image";
import { storage } from "@/utils/storage";
import SectionHeading from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(userId);

  if (!user) {
    notFound();
  }

  return (
    <>
      <PageHeader>ユーザー: {user.name}</PageHeader>
      <div className="p-3 pb-24">
        <Card className="max-w-96">
          <CardContent className="flex flex-col items-center">
            <Image
              src={storage.getPublicUrl("avatars", user.image)}
              alt=""
              width={96}
              height={96}
              className="rounded-full"
            />
            <div className="mt-2 font-bold">{user.name}</div>
            <div className="text-sm text-neutral-500">{user.email}</div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <SectionHeading>{user.name}がオーナーのチャットルーム</SectionHeading>
          <div className="mt-3">
            {user.chatRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
