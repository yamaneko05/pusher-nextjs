"use client";

import { createMessageAction } from "@/actions/message-actions";
import { CreateChatMessageSchema } from "@/utils/definitions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Loader2, LucideSend } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import AttachmentsPreview from "./attachments-preview";

export default function CreateChatMessageForm({
  chatRoomId,
}: {
  chatRoomId: string;
}) {
  const binded = createMessageAction.bind(null, chatRoomId);
  const [lastResult, action, pending] = useActionState(binded, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateChatMessageSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action} onSubmit={form.onSubmit} id={form.id}>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          {fields.attachments.value && !fields.attachments.errors && (
            <div className="mb-2">
              <AttachmentsPreview attachments={fields.attachments.value} />
            </div>
          )}
          <Textarea
            name={fields.text.name}
            placeholder="テキスト"
            className="resize-none"
          />
          <Input
            type="file"
            name={fields.attachments.name}
            multiple
            accept="image/*"
            className="max-w-80"
          />
        </div>
        <Button size={"icon"} disabled={pending}>
          {pending ? <Loader2 className="animate-spin" /> : <LucideSend />}
        </Button>
      </div>
      <div className="h-8 m-1">
        {[
          ...(fields.text.errors ?? []),
          ...(fields.attachments.errors ?? []),
        ]?.map((error, i) => (
          <div key={i} className="text-xs text-red-500">
            {error}
          </div>
        ))}
      </div>
    </form>
  );
}
