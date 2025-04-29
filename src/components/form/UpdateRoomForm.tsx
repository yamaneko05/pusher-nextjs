"use client";

import { UpdateRoomSchema } from "@/utils/schemas";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Field from "../Field";
import { Button } from "../shadcn/button";
import { Loader2 } from "lucide-react";
import { RoomForSettingPage } from "@/utils/types";
import { updateRoomAction } from "@/actions/room-actions";
import { useState } from "react";

export default function UpdateRoomForm({ room }: { room: RoomForSettingPage }) {
  const [pending, setPending] = useState(false);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateRoomSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      name: room.name,
    },
    async onSubmit(event, { formData }) {
      event.preventDefault();
      setPending(true);
      await updateRoomAction(room.id, formData);
      setPending(false);
    },
  });

  return (
    <form {...getFormProps(form)}>
      <Field field={fields.name} label="チャットルームの名前" type="text" />
      <Button className="mt-8 w-full" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        保存
      </Button>
    </form>
  );
}
