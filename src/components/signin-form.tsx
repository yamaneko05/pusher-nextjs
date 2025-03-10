"use client";

import { signinAction } from "@/actions/auth-actions";
import { SigninFormSchema } from "@/utils/definitions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "./field";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function SigninForm() {
  const [lastResult, action, pending] = useActionState(signinAction, undefined);
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
      <div className="flex flex-col gap-2">
        <Field
          label="メールアドレス"
          type="email"
          placeholder="Email"
          field={fields.email}
        />
        <Field
          label="パスワード"
          type="password"
          placeholder="Password"
          field={fields.password}
        />
        {form.errors && (
          <div className="text-sm flex flex-col text-red-500">
            {form.errors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
        <Button disabled={pending} type="submit" className="w-full">
          {pending && <Loader2 className="animate-spin" />}
          ログイン
        </Button>
      </div>
    </form>
  );
}
