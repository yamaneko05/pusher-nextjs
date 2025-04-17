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

  const { name, biography } = submission.value;

  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  await userService.update(name, biography);

  return submission.reply({ resetForm: true });
}
