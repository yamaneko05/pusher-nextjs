"use client";

import { signin } from "@/actions/auth";
import { SigninFormSchema } from "@/utils/definitions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "./field";

export default function SigninForm() {
  const [lastResult, action, pending] = useActionState(signin, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SigninFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="mt-3">
        <Field label="メールアドレス" type="email" field={fields.email} />
      </div>
      <div className="mt-3">
        <Field label="パスワード" type="password" field={fields.password} />
      </div>
      {form.errors && (
        <div className="text-sm flex flex-col text-blue-500 mt-3">
          {form.errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}
      <div className="mt-9 flex justify-end">
        <button
          disabled={pending}
          type="submit"
          className="rounded py-1.5 px-3 bg-blue-500 text-white text-sm font-bold"
        >
          サインイン
        </button>
      </div>
    </form>
  );
}
