import { Card, CardContent } from "@/components/shadcn/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center px-3">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
