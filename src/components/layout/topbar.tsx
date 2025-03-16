"use client";

import Link from "next/link";

export default function Topbar() {
  return (
    <div className="fixed top-0 right-0 left-0 flex h-14 items-center border-b bg-white px-3 sm:hidden">
      <Link href={"/"} className="text-xl font-bold">
        Pusher Next.js
      </Link>
    </div>
  );
}
