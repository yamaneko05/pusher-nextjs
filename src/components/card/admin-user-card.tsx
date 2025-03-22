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
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Image
          src={storage.getPublicUrl("avatars", user.image)}
          alt=""
          className="size-8 rounded-full"
          width={300}
          height={300}
        />
        <div className="font-bold">{user.name}</div>
      </div>
      <div className="text-sm text-neutral-500">
        <div>ID: {user.id}</div>
        <div>メールアドレス: {user.email}</div>
      </div>
      <div>
        <Button onClick={handleDeleteClick} variant={"destructive"} size={"sm"}>
          削除
        </Button>
      </div>
    </div>
  );
}
