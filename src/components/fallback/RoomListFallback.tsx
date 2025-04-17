import { Skeleton } from "@/components/shadcn/skeleton";

export default function RoomListFallback() {
  return (
    <div className="animate-pulse">
      {[...Array(5).keys()].map((i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
