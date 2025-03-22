import PageHeader from "@/components/layout/page-header";
import FriendList from "@/components/list/friend-list";
import { getSessionPayload } from "@/utils/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await getSessionPayload();
  if (!session) redirect("/signin");

  return (
    <>
      <PageHeader pageHeading="友達" prevHref="/" />
      <div className="">
        <div className="">友達</div>
        <Suspense fallback={"...loading"}>
          <FriendList userId={session.user.id} />
        </Suspense>
      </div>
      <div className="">
        <div className="">受け取った申請</div>
        {/* <ReceivedRequestList /> */}
      </div>
    </>
  );
}
