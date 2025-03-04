"use server";

import { comparePassword, encryptPassword } from "@/utils/password";
import { createUser, getUserByEmail } from "@/utils/db";
import { SigninFormSchema, SignupFormSchema } from "@/utils/definitions";
import { parseWithZod } from "@conform-to/zod";
import { createSession, deleteSession } from "@/utils/session";
import { redirect } from "next/navigation";
import { resizeImage } from "@/utils/image";
import { upload } from "@/utils/storage";

export async function signup(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SignupFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password, image } = submission.value;

  const passwordHash = encryptPassword(password);

  const imageBuffer = await image.arrayBuffer();
  const resized = await resizeImage(imageBuffer);
  const path = crypto.randomUUID() + ".webp";

  await upload("avatars", path, resized);

  const user = await createUser(name, email, passwordHash, path);

  await createSession({
    user: { id: user.id, name: user.name, image: user.image },
  });

  redirect("/");
}

export async function signin(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SigninFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;
  const user = await getUserByEmail(email);

  if (!user) {
    return submission.reply({
      formErrors: ["このメールアドレスのユーザーは存在しません"],
    });
  } else if (!comparePassword(password, user.password)) {
    return submission.reply({ formErrors: ["パスワードが違います"] });
  }

  await createSession({
    user: { id: user.id, name: user.name, image: user.image },
  });
  redirect("/");
}

export async function signout() {
  await deleteSession();
  redirect("/signin");
}
