import RoomCard from "@/components/card/RoomCard";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Bottombar from "@/components/layout/BottomBar";
import { UserRepository } from "@/repositories/UserRepository";
import Image from "next/image";
import { storage } from "@/utils/storage";
import SectionHeading from "@/components/SectionHeading";
import UserCardButton from "@/components/card/UserCardButton";
import EmptyArray from "@/components/EmptyArray";

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
        <div>
          <SectionHeading>{user.name}のプロフィール</SectionHeading>
          <div className="mt-3">
            <Image
              src={storage.getPublicUrl("avatars", user.image)}
              alt=""
              width={128}
              height={128}
              className="rounded-full"
            />
            <div className="mt-2 text-xl font-bold">{user.name}</div>
            <div className="text-sm text-neutral-500">{user.email}</div>
            <div className="text-sm text-neutral-500">{user.biography}</div>
            <div className="mt-2">
              <UserCardButton user={user} />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <SectionHeading>{user.name}がオーナーのチャットルーム</SectionHeading>
          <div className="mt-3">
            {user.chatRooms.length ? (
              user.chatRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            ) : (
              <EmptyArray
                title={`${user.name}がオーナーのチャットルームはありません`}
                description="新しいチャットルームを作成してみましょう"
              />
            )}
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
