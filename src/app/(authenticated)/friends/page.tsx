import UserListFallback from "@/components/fallback/UserListFallback";
import Bottombar from "@/components/layout/BottomBar";
import FriendList from "@/components/list/FriendList";
import FriendRequestList from "@/components/list/FriendRequestList";
import SectionHeading from "@/components/SectionHeading";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <div className="p-3 pb-24">
        <div className="">
          <SectionHeading>友達</SectionHeading>
          <div className="mt-2">
            <Suspense fallback={<UserListFallback length={3} />}>
              <FriendList />
            </Suspense>
          </div>
        </div>
        <div className="mt-8">
          <SectionHeading>受け取った申請</SectionHeading>
          <div className="mt-2">
            <Suspense fallback={<UserListFallback length={3} />}>
              <FriendRequestList />
            </Suspense>
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
