"use client";

import { signupAction } from "@/actions/auth-actions";
import { SignupFormSchema } from "@/utils/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

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
      <div className="flex flex-col gap-2">
        <Field
          label="名前"
          type="text"
          placeholder="Name"
          field={fields.name}
        />
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
        <div>
          <div className="text-sm">画像</div>
          <div className="mt-1">
            <Input type="file" name={fields.image.name} accept="image/*" />
          </div>
          <div className="h-8 pt-1">
            {fields.image.errors?.map((error, i) => (
              <div key={i} className="text-xs text-red-500">
                {error}
              </div>
            ))}
          </div>
        </div>
        <Button disabled={pending} type="submit" className="w-full">
          {pending && <Loader2 className="animate-spin" />}
          サインアップ
        </Button>
      </div>
    </form>
  );
}
