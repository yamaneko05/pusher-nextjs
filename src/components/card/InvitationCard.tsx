import { storage } from "@/utils/storage";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcn/button";
import {
  acceptInvitationAction,
  rejectInvitationAction,
} from "@/actions/invitation-actions";
import { invitationBase } from "@/utils/types";

export default function InvitationCard({
  invitation,
}: {
  invitation: invitationBase;
}) {
  const handleAcceptClick = async () => {
    "use server";

    await acceptInvitationAction(invitation.chatRoom.id, invitation.sender.id);
  };

  const handleRejectClick = async () => {
    "use server";

    await rejectInvitationAction(invitation.chatRoom.id, invitation.sender.id);
  };

  return (
    <div className="flex items-center gap-4 py-2">
      <Link href={`/users/${invitation.sender.id}`}>
        <Image
          src={storage.getPublicUrl("avatars", invitation.sender.image)}
          alt=""
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>
      <div className="font-bold">
        {invitation.sender.name} | {invitation.chatRoom.name}
      </div>
      <Button onClick={handleAcceptClick}>承諾</Button>
      <Button variant={"destructive"} onClick={handleRejectClick}>
        拒否
      </Button>
    </div>
  );
}
