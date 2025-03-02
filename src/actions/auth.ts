"use server";

import { SigninFormSchema, SignupFormSchema } from "@/utils/definitions";
import { parseWithZod } from "@conform-to/zod";

export async function signup(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SignupFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission.value);
}

export async function signip(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SigninFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission.value);
}
