import { storage } from "@/utils/storage";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcn/button";
import { invitationBase } from "@/utils/types";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { redirect } from "next/navigation";
import { InvitationService } from "@/services/InvitationService";
import { revalidatePath } from "next/cache";

export default function InvitationCard({
  invitation,
}: {
  invitation: invitationBase;
}) {
  const handleAcceptClick = async () => {
    "use server";

    const payload = await getSessionPayloadOrUnauthorized();

    const invitationService = new InvitationService();
    await invitationService.accept(
      invitation.chatRoom.id,
      invitation.sender.id,
      payload.user.id,
    );

    redirect(`/chat-rooms/${invitation.chatRoom.id}`);
  };

  const handleRejectClick = async () => {
    "use server";

    const payload = await getSessionPayloadOrUnauthorized();

    const invitationService = new InvitationService();
    await invitationService.reject(
      invitation.chatRoom.id,
      invitation.sender.id,
      payload.user.id,
    );

    revalidatePath("/chat-rooms");
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
