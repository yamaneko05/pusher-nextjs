import { Card, CardContent } from "@/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center px-3">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
