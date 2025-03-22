"use client";

import { UserForCard } from "@/utils/types";
import { Button } from "../ui/button";
import { sendFriendRequestAction } from "@/actions/friend-request-actions";
import { useContext, useState } from "react";
import { SessionContext } from "@/utils/context";
import Image from "next/image";
import Link from "next/link";
import { storage } from "@/utils/storage";

export default function UserCard({ user }: { user: UserForCard }) {
  const handleSendFriendRequestButtonClick = async () => {
    await sendFriendRequestAction(user.id);
    setRequestIsPending(true);
  };

  const session = useContext(SessionContext);

  const isMe = session!.user.id === user.id;
  const alreadyFriend = user._count.friends === 1;

  const [requestIsPending, setRequestIsPending] = useState(
    user._count.receivedRequests === 1,
  );

  return (
    <div className="flex items-center gap-4">
      <Link href={`/users/${user.id}`}>
        <Image
          src={storage.getPublicUrl("avatars", user.image)}
          alt=""
          fill
          className="relative! size-12! rounded-full"
        />
      </Link>
      <div className="font-bold">{user.name}</div>
      {!isMe &&
        (alreadyFriend ? (
          <Button variant={"destructive"}>友達から削除</Button>
        ) : requestIsPending ? (
          <Button disabled>申請中</Button>
        ) : (
          <Button onClick={handleSendFriendRequestButtonClick}>
            友達申請する
          </Button>
        ))}
    </div>
  );
}
