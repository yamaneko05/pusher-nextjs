"use client";

import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { navItems } from "@/utils/definitions";
import { usePathname } from "next/navigation";

export default function Bottombar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-around w-full">
      {navItems.map((navItem, i) => (
        <Link
          key={i}
          href={navItem.path}
          className={buttonVariants({
            variant: navItem.path === pathname ? "default" : "ghost",
            size: "icon",
          })}
        >
          {navItem.icon}
        </Link>
      ))}
    </div>
  );
}
