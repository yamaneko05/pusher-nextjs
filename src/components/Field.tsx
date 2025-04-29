import { FieldMetadata, getInputProps } from "@conform-to/react";
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
  type: "text" | "password";
  placeholder?: string;
  field: FieldMetadata;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label>{label}</Label>
        <Input
          placeholder={placeholder}
          {...getInputProps(field, { type })}
          key={field.key}
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
