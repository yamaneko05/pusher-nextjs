"use client";

import { UserForCard } from "@/utils/types";
import { Button } from "../ui/button";
import { sendFriendRequestAction } from "@/actions/friend-request-actions";
import { useContext, useState } from "react";
import { SessionContext } from "@/utils/context";
import { dissolveFriendshipAction } from "@/actions/user-actions";

export default function UserCardButton({ user }: { user: UserForCard }) {
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

  if (!isMe) {
    if (alreadyFriend) {
      return (
        <Button
          size={"sm"}
          variant={"destructive"}
          onClick={handleDissolveFriendshipButtonClick}
        >
          友達から削除
        </Button>
      );
    } else {
      if (requestIsPending) {
        return (
          <Button size={"sm"} disabled>
            申請中
          </Button>
        );
      } else {
        return (
          <Button size={"sm"} onClick={handleSendFriendRequestButtonClick}>
            友達申請する
          </Button>
        );
      }
    }
  }
}
