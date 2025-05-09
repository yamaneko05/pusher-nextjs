import Link from "next/link";
import HeaderBase from "./HeaderBase";
import Image from "next/image";
import { storage } from "@/utils/storage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn/tooltip";
import { buttonVariants } from "../shadcn/button";
import { LucideSettings } from "lucide-react";

type Member = {
  id: string;
  name: string;
  image: string;
};

export default function RoomHeader({
  id,
  name,
  members,
}: {
  id: string;
  name: string;
  members: Member[];
}) {
  return (
    <HeaderBase>
      <div className="flex items-center justify-between">
        <div className="font-bold">{name}</div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {members.map((member) => (
              <TooltipProvider key={member.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/users/${member.id}`}>
                      <Image
                        src={storage.getPublicUrl("avatars", member.image)}
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{member.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <Link
            href={`/chat-rooms/${id}/setting`}
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            <LucideSettings />
          </Link>
        </div>
      </div>
    </HeaderBase>
  );
}
