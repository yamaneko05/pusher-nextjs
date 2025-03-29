import { signoutAction } from "@/actions/auth-actions";
import { getSessionPayload } from "@/utils/session";
import { storage } from "@/utils/storage";
import Image from "next/image";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default async function Sidebar() {
  const payload = await getSessionPayload();

  return (
    <div className="fixed hidden h-screen w-64 border-r px-3 py-12 sm:block">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <div className="pl-4">
            <Link href={"/"} className="text-xl font-bold">
              Pusher Next.js
            </Link>
          </div>
          <Navigation />
        </div>
        <div className="flex flex-col items-center">
          <Link href={`/users/${payload!.user.id}`}>
            <Image
              src={storage.getPublicUrl("avatars", payload!.user.image)}
              alt=""
              className="rounded-full border border-neutral-300"
              width={96}
              height={96}
              priority
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
