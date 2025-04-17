import { signoutAction } from "@/actions/auth-actions";
import { getSessionPayload } from "@/utils/session";
import { storage } from "@/utils/storage";
import Image from "next/image";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn/tooltip";
import { LucideLogOut } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <Link href={`/users/${payload!.user.id}`}>
            <Image
              src={storage.getPublicUrl("avatars", payload!.user.image)}
              alt=""
              className="rounded-full border border-neutral-300"
              width={48}
              height={48}
              priority
            />
          </Link>
          <div className="flex-1 text-sm font-bold">{payload!.user.name}</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={signoutAction} variant={"secondary"}>
                  <LucideLogOut />
                </Button>
              </TooltipTrigger>
              <TooltipContent>ログアウト</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
