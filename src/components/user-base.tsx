import { storage } from "@/utils/storage";
import { type UserBase } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function UserBase({
  user,
  children,
}: {
  user: UserBase;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <Link href={`/users/${user.id}`}>
        <Image
          src={storage.getPublicUrl("avatars", user.image)}
          alt=""
          fill
          className="relative! size-12! rounded-full"
        />
      </Link>
      <div className="font-bold">{user.name}</div>
      {children}
    </div>
  );
}
