"use client";

import { createRoomAction } from "@/actions/room-actions";
import { CreateChatRoomSchema } from "@/utils/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import Field from "@/components/Field";
import { Button } from "@/components/shadcn/button";
import { Loader2 } from "lucide-react";
import { UserForCard } from "@/utils/types";
import { Label } from "../shadcn/label";
import UserCardBase from "../card/UserCardBase";
import { Checkbox } from "../shadcn/checkbox";
import { RadioGroup, RadioGroupItem } from "../shadcn/radio-group";
import FieldError from "../FieldError";

export default function CreateChatRoomForm({
  friends,
}: {
  friends: UserForCard[];
}) {
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
      <Field
        label="チャットルームの名前"
        field={fields.name}
        placeholder="チャットルームの名前"
        type="text"
      />
      <div className="mt-8">
        <Label>友達の追加の方法</Label>
        <RadioGroup
          name={fields.method.name}
          defaultValue="invitation"
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="invitation" id="r1" />
            <Label htmlFor="r1">招待して友達を追加</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="skip" id="r2" />
            <Label htmlFor="r2">招待をスキップして追加</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mt-8">
        <Label>友達を選択</Label>
        <div className="mt-2 flex flex-col gap-4">
          {friends.map((friend) => (
            <UserCardBase key={friend.id} user={friend}>
              <Checkbox name={fields.members.name} value={friend.id} />
            </UserCardBase>
          ))}
        </div>
        {fields.members.errors && <FieldError errors={fields.members.errors} />}
      </div>
      <Button className="mt-8 w-full" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        作成
      </Button>
    </form>
  );
}
