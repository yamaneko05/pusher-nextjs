"use client";

import { LucideChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({
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
      <div className="flex items-center gap-2">
        <button onClick={handleBackButtonClick}>
          <LucideChevronLeft />
        </button>
        <div className="font-bold">{children}</div>
      </div>
    </div>
  );
}
