"use client";

import { storage } from "@/utils/storage";
import { FriendRequestBase } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcn/button";
import {
  acceptFriendRequestAction,
  rejectFriendRequestAction,
} from "@/actions/friend-request-actions";

export default function FriendRequestCard({
  friendRequest,
}: {
  friendRequest: FriendRequestBase;
}) {
  const handleAcceptClick = async () => {
    await acceptFriendRequestAction(friendRequest.id);
  };

  const handleRejectClick = async () => {
    await rejectFriendRequestAction(friendRequest.id);
  };

  return (
    <div className="flex items-center gap-4 py-2">
      <Link href={`/users/${friendRequest.sender.id}`}>
        <Image
          src={storage.getPublicUrl("avatars", friendRequest.sender.image)}
          alt=""
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>
      <div className="font-bold">{friendRequest.sender.name}</div>
      <Button onClick={handleAcceptClick}>承諾</Button>
      <Button variant={"destructive"} onClick={handleRejectClick}>
        拒否
      </Button>
    </div>
  );
}
