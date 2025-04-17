import { UserForCard } from "@/utils/types";
import UserCardButton from "./UserCardButton";
import UserCardBase from "./UserCardBase";

export default function UserCard({ user }: { user: UserForCard }) {
  return (
    <UserCardBase user={user}>
      <UserCardButton user={user} />
    </UserCardBase>
  );
}
