import { signout } from "@/actions/auth";
import { getSessionPayload } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getSessionPayload();
  if (!payload?.user) {
    redirect("/signin");
  }

  return (
    <>
      <div className="fixed h-screen border-r w-64 p-3">
        <div>{payload.user.name}</div>
        <button
          onClick={signout}
          className="py-1.5 px-3 rounded bg-gray-700 text-white text-sm font-bold"
        >
          ログアウト
        </button>
      </div>
      <div className="pl-64">
        <div className="p-3 pb-24">{children}</div>
      </div>
    </>
  );
}
