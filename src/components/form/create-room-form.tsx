"use client";

import { createRoomAction } from "@/actions/room-actions";
import { CreateChatRoomSchema } from "@/utils/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CreateChatRoomForm() {
  const [lastResult, action, pending] = useActionState(
    createRoomAction,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateChatRoomSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action} onSubmit={form.onSubmit} id={form.id}>
      <div className="flex flex-col gap-2">
        <Field
          label="チャットルームの名前"
          field={fields.name}
          placeholder="チャットルームの名前"
          type="text"
        />
        <Button className="w-full" disabled={pending}>
          {pending && <Loader2 className="animate-spin" />}
          作成
        </Button>
      </div>
    </form>
  );
}
