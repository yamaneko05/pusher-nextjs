"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const navItems = [
  {
    path: "/chat-rooms",
    name: "全てのチャットルーム",
  },
  {
    path: "/chat-rooms/create",
    name: "新しいチャットルームを作成",
  },
  {
    path: "/avatars",
    name: "全てのアバター",
  },
  {
    path: "/admin/users",
    name: "ユーザー管理",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((navItem, i) => (
        <Link
          key={i}
          href={navItem.path}
          className={buttonVariants({
            variant: navItem.path === pathname ? "default" : "ghost",
            className: "w-full justify-start",
          })}
        >
          {navItem.name}
        </Link>
      ))}
    </div>
  );
}
