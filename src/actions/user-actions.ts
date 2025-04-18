"use server";

import { UserService } from "@/services/UserService";
import { UpdateUserFormSchema } from "@/utils/schemas";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";

export async function searchUserAction(name: string) {
  const userService = new UserService();
  const results = userService.search(name);

  return results;
}

export async function dissolveFriendshipAction(friendId: string) {
  const userService = new UserService();
  const payload = await getSessionPayloadOrUnauthorized();
  await userService.dissolveFriendship(payload.user.id, friendId);

  revalidatePath("/friends");
}

export async function updateUserAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: UpdateUserFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, biography } = submission.value;

  const payload = await getSessionPayloadOrUnauthorized();

  const userService = new UserService();
  await userService.update(payload.user.id, name, biography);

  return submission.reply({ resetForm: true });
}
