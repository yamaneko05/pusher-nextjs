"use client";

import { signup } from "@/actions/auth";
import { SignupFormSchema } from "@/utils/definitions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "./field";

export default function SignupForm() {
  const [lastResult, action, pending] = useActionState(signup, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div>
        <Field label="名前" type="text" field={fields.name} />
      </div>
      <div className="mt-3">
        <Field label="メールアドレス" type="email" field={fields.email} />
      </div>
      <div className="mt-3">
        <Field label="パスワード" type="password" field={fields.password} />
      </div>
      <div className="mt-9 flex justify-end">
        <button
          disabled={pending}
          type="submit"
          className="rounded py-1.5 px-3 bg-blue-500 text-white text-sm font-bold"
        >
          サインアップ
        </button>
      </div>
    </form>
  );
}
