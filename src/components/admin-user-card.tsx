import { getPublicUrl } from "@/utils/storage";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Button } from "./ui/button";
import { deleteUserUsecase } from "@/usecase/user/delete-user-usecase";

export default function AdminUserCard({
  user,
}: {
  user: Omit<User, "password">;
}) {
  const handleDeleteClick = async () => {
    "use server";

    await deleteUserUsecase(user.id);
    revalidatePath("/admin/users");
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Image
          src={getPublicUrl("avatars", user.image)}
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
