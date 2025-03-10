import Bottombar from "@/components/bottombar";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed h-screen border-r w-64 p-3 pb-12 hidden sm:block">
        <Sidebar />
      </div>
      <div className="sticky w-full border-b sm:hidden px-3 py-2">
        <Topbar />
      </div>
      <div className="fixed bottom-0 w-full border-t sm:hidden px-3 py-1.5">
        <Bottombar />
      </div>
      <div className="sm:pl-64">{children}</div>
    </>
  );
}
