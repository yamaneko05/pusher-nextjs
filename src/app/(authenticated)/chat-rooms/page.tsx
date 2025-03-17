import PageHeader from "@/components/layout/page-header";
import Bottombar from "@/components/layout/bottombar";
import { Suspense } from "react";
import ChatRoomList from "@/components/chat-room-list";
import ChatRoomListFallback from "@/components/fallback/chat-room-list-fallback";

export default async function Page() {
  return (
    <>
      <PageHeader pageHeading="チャットルーム一覧" prevHref="/" />
      <Suspense fallback={<ChatRoomListFallback />}>
        <ChatRoomList />
      </Suspense>
      <Bottombar />
    </>
  );
}
