"use client";

import { UserForCard } from "@/utils/types";
import { Button } from "./ui/button";
import { sendFriendRequestAction } from "@/actions/friend-request-actions";
import { useContext, useState } from "react";
import { SessionContext } from "@/utils/context";
import UserCardBase from "./user-base";

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
    <UserCardBase user={user}>
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
    </UserCardBase>
  );
}
