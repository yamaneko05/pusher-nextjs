import { storage } from "@/utils/storage";
import Image from "next/image";
import { Button } from "../shadcn/button";
import { UserForAdmin } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { UserRepository } from "@/repositories/UserRepository";
import { UserService } from "@/services/UserService";

export default function AdminUserCard({ user }: { user: UserForAdmin }) {
  const handleDeleteClick = async () => {
    "use server";

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    await userService.delete(user.id);

    revalidatePath("/admin/users");
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
