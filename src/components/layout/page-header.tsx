import { LucideChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PageHeader({
  pageHeading,
  prevHref,
}: {
  pageHeading: string;
  prevHref: string;
}) {
  return (
    <div className="border-b p-3">
      <div className="flex items-center gap-2">
        <Link href={prevHref}>
          <LucideChevronLeft size={28} />
        </Link>
        <div className="text-lg font-bold sm:text-xl">{pageHeading}</div>
      </div>
    </div>
  );
}
