import { UserForCard } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { storage } from "@/utils/storage";
import UserCardButton from "./UserCardButton";

export default function UserCard({ user }: { user: UserForCard }) {
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
      <UserCardButton user={user} />
    </div>
  );
}
