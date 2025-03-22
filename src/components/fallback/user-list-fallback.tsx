import { Skeleton } from "@/components/ui/skeleton";

export default function UserListFallback({ length }: { length: number }) {
  return (
    <div className="animate-pulse">
      {[...Array(length).keys()].map((i) => (
        <UserCardSkelton key={i} />
      ))}
    </div>
  );
}

export function UserCardSkelton() {
  return (
    <div className="flex items-center gap-4 py-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
}
