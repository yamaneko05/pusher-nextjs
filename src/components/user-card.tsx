import { getPublicUrl } from "@/utils/storage";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  return (
    <Link href={`/users/${user.id}`} className="flex items-center gap-2">
      <Image
        src={getPublicUrl("avatars", user.image!)}
        width={300}
        height={300}
        alt=""
        className="size-8 rounded-full"
      />
      <div className="text-sm">{user.name}</div>
    </Link>
  );
}
