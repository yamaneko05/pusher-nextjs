import Bottombar from "@/components/layout/BottomBar";
import { Suspense } from "react";
import RoomList from "@/components/list/RoomList";
import RoomListFallback from "@/components/fallback/RoomListFallback";
import SectionHeading from "@/components/SectionHeading";

export default async function Page() {
  return (
    <>
      <div className="p-3 pb-24">
        <SectionHeading>全てのチャットルーム</SectionHeading>
        <div className="mt-3">
          <Suspense fallback={<RoomListFallback />}>
            <RoomList />
          </Suspense>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
