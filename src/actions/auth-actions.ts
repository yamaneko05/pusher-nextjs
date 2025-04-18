"use server";

import { SigninFormSchema, SignupFormSchema } from "@/utils/schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { AuthService } from "@/services/AuthService";

export async function signupAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SignupFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password, image } = submission.value;

  const authService = new AuthService();
  await authService.signup(name, email, password, image);

  redirect("/");
}

export async function signinAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SigninFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;

  const authService = new AuthService();
  const { error } = await authService.signin(email, password);

  if (error) {
    if (error === "UserNotFound") {
      return submission.reply({
        formErrors: ["このメールアドレスのユーザーは存在しません"],
      });
    }

    return submission.reply({ formErrors: ["パスワードが違います"] });
  }

  redirect("/");
}
