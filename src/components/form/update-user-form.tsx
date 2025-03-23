"use client";

import { UpdateUserFormSchema } from "@/utils/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { updateUserAction } from "@/actions/user-actions";
import { UserBase } from "@/utils/types";

export default function UpdateUserForm({ user }: { user: UserBase }) {
  const [lastResult, action, pending] = useActionState(
    updateUserAction,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateUserFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      name: user.name,
    },
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
        <Button disabled={pending} type="submit">
          {pending && <Loader2 className="animate-spin" />}
          保存
        </Button>
      </div>
    </form>
  );
}
