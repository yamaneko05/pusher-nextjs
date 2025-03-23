import { FieldMetadata } from "@conform-to/react";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
    <div className="flex flex-col gap-0.5">
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
      <div className="h-8">
        {field.errors?.map((error, i) => (
          <div key={i} className="text-xs text-red-500">
            {error}
          </div>
        ))}
      </div>
    </div>
  );
}
