"use client";

import { navItems } from "@/utils/constants";
import { buttonVariants } from "../shadcn/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Bottombar() {
  const pathname = usePathname();

  return (
    <div className="fixed right-0 bottom-0 left-0 flex h-14 items-center justify-around border-t px-3 sm:hidden">
      {navItems.map((navItem, i) => (
        <Link
          key={i}
          href={navItem.path}
          className={buttonVariants({
            variant: navItem.path === pathname ? "secondary" : "ghost",
            size: "lg",
          })}
        >
          {navItem.icon}
        </Link>
      ))}
    </div>
  );
}
