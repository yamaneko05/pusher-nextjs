import { UserForCard } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { storage } from "@/utils/storage";

export default function UserCardBase({
  user,
  children,
}: {
  user: UserForCard;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
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
      </div>
      <div>{children}</div>
    </div>
  );
}
