import Bottombar from "@/components/layout/BottomBar";
import { Suspense } from "react";
import ChatRoomList from "@/components/list/ChatRoomList";
import ChatRoomListFallback from "@/components/fallback/ChatRoomList-Fallback";
import SectionHeading from "@/components/SectionHeading";

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
