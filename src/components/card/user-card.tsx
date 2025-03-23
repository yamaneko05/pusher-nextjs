"use client";

import { UserForCard } from "@/utils/types";
import { Button } from "../ui/button";
import { sendFriendRequestAction } from "@/actions/friend-request-actions";
import { useContext, useState } from "react";
import { SessionContext } from "@/utils/context";
import Image from "next/image";
import Link from "next/link";
import { storage } from "@/utils/storage";
import { dissolveFriendshipAction } from "@/actions/user-actions";

export default function UserCard({ user }: { user: UserForCard }) {
  const handleSendFriendRequestButtonClick = async () => {
    await sendFriendRequestAction(user.id);
    setRequestIsPending(true);
  };

  const handleDissolveFriendshipButtonClick = async () => {
    await dissolveFriendshipAction(user.id);
  };

  const session = useContext(SessionContext);

  const isMe = session!.user.id === user.id;
  const alreadyFriend = user.friends.some(
    (friend) => friend.id === session!.user.id,
  );

  const [requestIsPending, setRequestIsPending] = useState(
    user.receivedRequests.some(
      (request) =>
        request.senderId === session!.user.id && request.status === "PENDING",
    ),
  );

  return (
    <div className="flex items-center gap-4 py-2">
      <Link href={`/users/${user.id}`}>
        <Image
          src={storage.getPublicUrl("avatars", user.image)}
          alt=""
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>
      <div className="font-bold">{user.name}</div>
      {!isMe &&
        (alreadyFriend ? (
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={handleDissolveFriendshipButtonClick}
          >
            友達から削除
          </Button>
        ) : requestIsPending ? (
          <Button size={"sm"} disabled>
            申請中
          </Button>
        ) : (
          <Button size={"sm"} onClick={handleSendFriendRequestButtonClick}>
            友達申請する
          </Button>
        ))}
    </div>
  );
}
