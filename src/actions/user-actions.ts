"use server";

import { UserRepository } from "@/repositories/UserRepository";
import { UserService } from "@/services/UserService";
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
