import { storage } from "@/utils/storage";
import Image from "next/image";
import { Button } from "../ui/button";
import { deleteUserAction } from "@/actions/user-actions";
import { UserForAdmin } from "@/utils/types";

export default function AdminUserCard({ user }: { user: UserForAdmin }) {
  const handleDeleteClick = async () => {
    "use server";

    await deleteUserAction(user.id);
  };

  return (
    <div className="flex flex-col gap-1.5 py-3">
      <div className="flex items-center gap-2">
        <Image
          src={storage.getPublicUrl("avatars", user.image)}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="font-bold">{user.name}</div>
        <Button onClick={handleDeleteClick} variant={"destructive"} size={"sm"}>
          削除
        </Button>
      </div>
      <div className="text-sm text-neutral-500">
        <div>ID: {user.id}</div>
        <div>メールアドレス: {user.email}</div>
      </div>
    </div>
  );
}
