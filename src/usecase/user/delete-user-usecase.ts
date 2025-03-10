import prisma from "@/utils/prisma";
import { remove } from "@/utils/storage";

export async function deleteUserUsecase(id: string) {
  const user = await prisma.user.delete({
    where: { id },
  });

  if (user.image) {
    await remove("avatars", [user.image]);
  }
}
