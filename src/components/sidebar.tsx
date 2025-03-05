import { signout } from "@/actions/auth";
import { getSessionPayload } from "@/utils/session";
import { getPublicUrl } from "@/utils/storage";
import Image from "next/image";
import { Button } from "./ui/button";
import Navigation from "./navigation";

export default async function Sidebar() {
  const payload = await getSessionPayload();

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="text-xl font-bold">Pusher Next.js</div>
        <Navigation />
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={getPublicUrl("avatars", payload!.user.image!)}
          alt=""
          className="size-24 rounded-full border border-gray-300"
          width={300}
          height={300}
        />
        <div className="mt-3 font-bold">{payload!.user.name}</div>
        <div className="mt-3">
          <Button onClick={signout} variant={"secondary"}>
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
}
