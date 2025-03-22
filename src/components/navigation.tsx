"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { navItems } from "@/utils/constants";

export default function Navigation() {
  const pathname = usePathname();

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
