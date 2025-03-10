"use server";

import { SigninFormSchema, SignupFormSchema } from "@/utils/definitions";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { signupUsecase } from "@/usecase/auth/signup-usecase";
import {
  signinUsecase,
  UserNotFoundError,
} from "@/usecase/auth/signin-usecase";
import { signoutUsecase } from "@/usecase/auth/signout-usecase";

export async function signupAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SignupFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password, image } = submission.value;

  await signupUsecase(name, email, password, image);

  redirect("/");
}

export async function signinAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: SigninFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;

  const { error } = await signinUsecase(email, password);

  if (error) {
    if (error instanceof UserNotFoundError) {
      return submission.reply({
        formErrors: ["このメールアドレスのユーザーは存在しません"],
      });
    }

    return submission.reply({ formErrors: ["パスワードが違います"] });
  }

  redirect("/");
}

export async function signoutAction() {
  await signoutUsecase();
  redirect("/signin");
}
