import Sidebar from "@/components/layout/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="sm:pl-64">{children}</div>
    </>
  );
}
