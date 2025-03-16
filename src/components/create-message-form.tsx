"use client";

import { createMessageAction } from "@/actions/message-actions";
import { CreateChatMessageSchema } from "@/utils/definitions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useRef } from "react";
import { Button } from "./ui/button";
import { Loader2, LucideImage, LucideSend } from "lucide-react";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="border-t px-3 py-2">
        <form action={action} onSubmit={form.onSubmit} id={form.id}>
          <div className="flex items-end gap-2">
            <div className="flex flex-1 flex-col gap-4">
              {fields.attachments.errors ? (
                <div className="text-xs text-red-500">
                  {fields.attachments.errors.map((error, i) => (
                    <div key={i}>{error}</div>
                  ))}
                </div>
              ) : (
                fields.attachments.value && (
                  <AttachmentsPreview attachments={fields.attachments.value} />
                )
              )}
              <Textarea
                name={fields.text.name}
                placeholder="テキスト"
                className="min-h-8 resize-none text-sm"
              />
            </div>
            <Button size={"icon"} disabled={pending}>
              {pending ? <Loader2 className="animate-spin" /> : <LucideSend />}
            </Button>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Button
              variant={"ghost"}
              onClick={handleFileButtonClick}
              size={"icon"}
            >
              <LucideImage />
            </Button>
            {fields.text.errors && (
              <div className="text-xs text-red-500">
                {fields.text.errors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            )}
          </div>
          <Input
            type="file"
            name={fields.attachments.name}
            multiple
            accept="image/*"
            ref={fileInputRef}
            hidden
          />
        </form>
      </div>
    </>
  );
}
