import Bottombar from "@/components/layout/bottombar";
import FriendList from "@/components/list/friend-list";
import FriendRequestList from "@/components/list/friend-request-list";
import SectionHeading from "@/components/section-heading";
import { getSessionPayload } from "@/utils/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await getSessionPayload();
  if (!session) redirect("/signin");

  return (
    <>
      <div className="p-3 pb-24">
        <div className="">
          <SectionHeading>友達</SectionHeading>
          <div className="mt-3">
            <Suspense fallback={"...loading"}>
              <FriendList userId={session.user.id} />
            </Suspense>
          </div>
        </div>
        <div className="mt-8">
          <SectionHeading>受け取った申請</SectionHeading>
          <div className="mt-3">
            <Suspense fallback={"...loading"}>
              <FriendRequestList userId={session.user.id} />
            </Suspense>
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
