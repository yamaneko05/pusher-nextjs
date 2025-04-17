"use client";

import { signupAction } from "@/actions/auth-actions";
import { SignupFormSchema } from "@/utils/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "@/components/Field";
import { Button } from "@/components/shadcn/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/shadcn/input";
import FieldError from "../FieldError";

export default function SignupForm() {
  const [lastResult, action, pending] = useActionState(signupAction, undefined);
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
      <Field label="名前" type="text" placeholder="Name" field={fields.name} />
      <div className="mt-4">
        <Field
          label="メールアドレス"
          type="email"
          placeholder="Email"
          field={fields.email}
        />
      </div>
      <div className="mt-4">
        <Field
          label="パスワード"
          type="password"
          placeholder="Password"
          field={fields.password}
        />
      </div>
      <div className="mt-4">
        <div className="text-sm">画像</div>
        <div className="mt-1">
          <Input type="file" name={fields.image.name} accept="image/*" />
        </div>
        {fields.image.errors && (
          <div className="mt-1">
            <FieldError errors={fields.image.errors} />
          </div>
        )}
      </div>
      <div className="mt-8">
        <Button disabled={pending} type="submit" className="w-full">
          {pending && <Loader2 className="animate-spin" />}
          サインアップ
        </Button>
      </div>
    </form>
  );
}
