import { signoutAction } from "@/actions/auth-actions";
import { getSessionPayload } from "@/utils/session";
import { getPublicUrl } from "@/utils/storage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";

export default async function Sidebar() {
  const payload = await getSessionPayload();

  return (
    <div className="fixed hidden h-screen w-64 border-r p-3 pb-12 sm:block">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <Link href={"/"} className="text-xl font-bold">
            Pusher Next.js
          </Link>
          <Navigation />
        </div>
        <div className="flex flex-col items-center">
          <Link href={`/users/${payload!.user.id}`}>
            <Image
              src={getPublicUrl("avatars", payload!.user.image)}
              alt=""
              className="size-24 rounded-full border border-neutral-300"
              width={300}
              height={300}
            />
          </Link>
          <div className="mt-3 font-bold">{payload!.user.name}</div>
          <div className="mt-3">
            <Button onClick={signoutAction} variant={"secondary"}>
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
