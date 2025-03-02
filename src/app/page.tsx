import PusherClientComponent from "@/components/pusher-client-component";
import { pusherServer } from "@/utils/pusher-server";
import { getSessionPayload } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const payload = await getSessionPayload();
  if (!payload?.user) {
    redirect("/signin");
  }

  const triggerFromServer = async () => {
    "use server";
    pusherServer.trigger("test-channel", "test-event", {
      message: new Date().toString(),
    });
  };

  return (
    <>
      <div>{payload.user.name}</div>
      <div>
        <button onClick={triggerFromServer}>trigger from server</button>
      </div>
      <div>
        <PusherClientComponent />
      </div>
    </>
  );
}
