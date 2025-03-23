"use server";

import { UserRepository } from "@/repositories/UserRepository";
import { UserService } from "@/services/UserService";
import { UpdateUserFormSchema } from "@/utils/schemas";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";

export async function searchUserAction(name: string) {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const results = userService.search(name);

  return results;
}

export async function deleteUserAction(id: string) {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  await userService.delete(id);

  revalidatePath("/admin/users");
}

export async function dissolveFriendshipAction(friendId: string) {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  await userService.dissolveFriendship(friendId);

  revalidatePath("/friends");
}

export async function updateUserAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: UpdateUserFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name } = submission.value;

  const userRepository = new UserRepository();
  const authService = new UserService(userRepository);
  await authService.update(name);

  return submission.reply({ resetForm: true });
}
