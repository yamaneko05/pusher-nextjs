import { InvitationRepository } from "@/repositories/InvitationRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import InvitationCard from "../card/InvitationCard";
import NoInvitations from "@/components/alert/NoInvitation";

export default async function InvitationList() {
  const payload = await getSessionPayloadOrUnauthorized();

  const invitationRepository = new InvitationRepository();
  const invitations = await invitationRepository.getPendingInvitations(
    payload.user.id,
  );

  return invitations.length ? (
    <>
      {invitations.map((invitation, i) => (
        <InvitationCard key={i} invitation={invitation} />
      ))}
    </>
  ) : (
    <NoInvitations />
  );
}
