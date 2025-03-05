import Sidebar from "@/components/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed h-screen border-r w-64 p-3 pb-12">
        <Sidebar />
      </div>
      <div className="pl-64">
        <div className="p-3 pb-24">{children}</div>
      </div>
    </>
  );
}
