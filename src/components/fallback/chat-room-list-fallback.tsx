import { Skeleton } from "@/components/ui/skeleton";

export default function ChatRoomListFallback() {
  return (
    <div className="flex animate-pulse flex-col p-3 pb-24">
      {[...Array(5).keys()].map((i) => (
        <div key={i} className="flex items-center py-2">
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
