"use client";

import { LucideChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../shadcn/button";

export default function HeaderBase({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div className="border-b p-3">
      <div className="flex items-center gap-3">
        <Button
          variant={"secondary"}
          onClick={handleBackButtonClick}
          size={"sm"}
        >
          <LucideChevronLeft />
        </Button>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
