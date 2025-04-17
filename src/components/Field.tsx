import { FieldMetadata } from "@conform-to/react";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "./shadcn/input";
import { Label } from "./shadcn/label";
import FieldError from "./FieldError";

export default function Field({
  label,
  type,
  placeholder,
  field,
}: {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  field: FieldMetadata;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label>{label}</Label>
        <Input
          type={type}
          name={field.name}
          placeholder={placeholder}
          defaultValue={
            field.initialValue as
              | string
              | number
              | readonly string[]
              | undefined
          }
        />
      </div>
      {field.errors && (
        <div className="mt-1">
          <FieldError errors={field.errors} />
        </div>
      )}
    </>
  );
}
