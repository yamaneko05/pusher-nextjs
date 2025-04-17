"use client";

import { signinAction } from "@/actions/auth-actions";
import { SigninFormSchema } from "@/utils/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "@/components/Field";
import { Button } from "@/components/shadcn/button";
import { Loader2 } from "lucide-react";
import FieldError from "../FieldError";

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
      <Field
        label="メールアドレス"
        type="email"
        placeholder="Email"
        field={fields.email}
      />
      <div className="mt-6">
        <Field
          label="パスワード"
          type="password"
          placeholder="Password"
          field={fields.password}
        />
      </div>
      {form.errors && (
        <div className="mt-6">
          <FieldError errors={form.errors} />
        </div>
      )}
      <div className="mt-8">
        <Button disabled={pending} type="submit" className="w-full">
          {pending && <Loader2 className="animate-spin" />}
          ログイン
        </Button>
      </div>
    </form>
  );
}
