"use server";

import { SigninFormSchema, SignupFormSchema } from "@/utils/schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import { UserRepository } from "@/repositories/UserRepository";

export async function signupAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SignupFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password, image } = submission.value;

  const userRepository = new UserRepository();
  const authService = new AuthService(userRepository);
  await authService.signup(name, email, password, image);

  redirect("/");
}

export async function signinAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SigninFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;

  const userRepository = new UserRepository();
  const authService = new AuthService(userRepository);
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

export async function signoutAction() {
  const userRepository = new UserRepository();
  const authService = new AuthService(userRepository);
  await authService.signout();
  redirect("/signin");
}
