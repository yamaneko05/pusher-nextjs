import Bottombar from "@/components/layout/bottombar";
import { Suspense } from "react";
import ChatRoomList from "@/components/list/chat-room-list";
import ChatRoomListFallback from "@/components/fallback/chat-room-list-fallback";
import SectionHeading from "@/components/section-heading";

export default async function Page() {
  return (
    <>
      <div className="p-3 pb-24">
        <SectionHeading>全てのチャットルーム</SectionHeading>
        <div className="mt-3">
          <Suspense fallback={<ChatRoomListFallback />}>
            <ChatRoomList />
          </Suspense>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
