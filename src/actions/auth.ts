"use server";

import { encryptPassword } from "@/utils/bcrypt";
import { createUser } from "@/utils/db";
import { SigninFormSchema, SignupFormSchema } from "@/utils/definitions";
import { parseWithZod } from "@conform-to/zod";

export async function signup(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SignupFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password } = submission.value;
  const passwordHash = encryptPassword(password);
  const user = await createUser(name, email, passwordHash);
}

export async function signip(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SigninFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission.value);
}
