import PusherClientComponent from "@/components/pusher-client-component";
import { pusherServer } from "@/utils/pusher-server";

export default function Home() {
  const triggerFromServer = async () => {
    "use server";
    pusherServer.trigger("test-channel", "test-event", {
      message: new Date().toString(),
    });
  };

  return (
    <>
      <div>
        <button onClick={triggerFromServer}>trigger from server</button>
      </div>
      <div>
        <PusherClientComponent />
      </div>
    </>
  );
}
