import { deleteUser } from "@/utils/db";
import { getPublicUrl } from "@/utils/storage";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Button } from "./ui/button";

export default function UserCard({ user }: { user: User }) {
  const handleDeleteClick = async () => {
    "use server";

    await deleteUser(user.id);
    revalidatePath("/admin/users");
  };

  return (
    <div className="py-2">
      <div className="font-bold">{user.name}</div>
      <div>ID: {user.id}</div>
      <div>メールアドレス: {user.email}</div>
      <div>
        {user.image ? (
          <Image
            src={getPublicUrl("avatars", user.image)}
            alt=""
            className="size-24"
            width={300}
            height={300}
          />
        ) : (
          "画像が登録させていません"
        )}
      </div>
      <div>
        <Button onClick={handleDeleteClick} variant={"destructive"} size={"sm"}>
          削除
        </Button>
      </div>
    </div>
  );
}
