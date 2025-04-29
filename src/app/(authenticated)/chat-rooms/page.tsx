import Bottombar from "@/components/layout/BottomBar";
import { Suspense } from "react";
import RoomList from "@/components/list/RoomList";
import RoomListFallback from "@/components/fallback/RoomListFallback";
import SectionHeading from "@/components/SectionHeading";
import InvitationList from "@/components/list/InvitationList";
import UserListFallback from "@/components/fallback/UserListFallback";

export default async function Page() {
  return (
    <>
      <div className="p-3 pb-24">
        <div>
          <SectionHeading>参加しているチャットルーム</SectionHeading>
          <div className="mt-2">
            <Suspense fallback={<RoomListFallback />}>
              <RoomList />
            </Suspense>
          </div>
        </div>
        <div className="mt-8">
          <SectionHeading>招待</SectionHeading>
          <div className="mt-2">
            <Suspense fallback={<UserListFallback length={3} />}>
              <InvitationList />
            </Suspense>
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
