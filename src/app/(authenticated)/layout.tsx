import Sidebar from "@/components/layout/Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-screen-lg">
      <Sidebar />
      <div className="sm:pl-64">{children}</div>
    </div>
  );
}
