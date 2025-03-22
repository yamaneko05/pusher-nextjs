import PageHeader from "@/components/layout/page-header";
import FriendList from "@/components/list/friend-list";
import FriendRequestList from "@/components/list/friend-request-list";
import { getSessionPayload } from "@/utils/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await getSessionPayload();
  if (!session) redirect("/signin");

  return (
    <>
      <PageHeader pageHeading="友達" prevHref="/" />
      <div className="p-3 pb-24">
        <div className="">
          <div className="text-lg font-bold">友達</div>
          <div className="mt-3">
            <Suspense fallback={"...loading"}>
              <FriendList userId={session.user.id} />
            </Suspense>
          </div>
        </div>
        <div className="mt-8">
          <div className="text-lg font-bold">受け取った申請</div>
          <div className="mt-3">
            <Suspense fallback={"...loading"}>
              <FriendRequestList userId={session.user.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
