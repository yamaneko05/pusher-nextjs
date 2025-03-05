import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2
        size={64}
        strokeWidth={1}
        className="animate-spin text-neutral-500"
      />
    </div>
  );
}
