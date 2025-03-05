import { signout } from "@/actions/auth";
import { getSessionPayload } from "@/utils/session";
import { getPublicUrl } from "@/utils/storage";
import Image from "next/image";
import { Button } from "./ui/button";

export default async function Sidebar() {
  const payload = await getSessionPayload();

  return (
    <div className="flex flex-col items-center">
      <div>
        {payload!.user.image ? (
          <Image
            src={getPublicUrl("avatars", payload!.user.image)}
            alt=""
            className="size-24 rounded-full border border-gray-300"
            width={300}
            height={300}
          />
        ) : (
          "画像が登録させていません"
        )}
      </div>
      <div className="mt-3 font-bold">{payload!.user.name}</div>
      <div className="mt-3">
        <Button onClick={signout} variant={"secondary"}>
          ログアウト
        </Button>
      </div>
    </div>
  );
}
