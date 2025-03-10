"use client";

import Link from "next/link";

export default function Topbar() {
  return (
    <Link href={"/"} className="text-lg font-bold">
      Pusher Next.js
    </Link>
  );
}
