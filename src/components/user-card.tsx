import { storage } from "@/utils/storage";
import { UserForCard } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }: { user: UserForCard }) {
  return (
    <Link href={`/users/${user.id}`} className="flex items-center gap-4">
      <Image
        src={storage.getPublicUrl("avatars", user.image)}
        alt=""
        fill
        className="relative! size-12! rounded-full"
      />
      <div className="font-bold">{user.name}</div>
    </Link>
  );
}
