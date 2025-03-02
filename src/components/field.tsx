import { FieldMetadata } from "@conform-to/react";
import { FieldErrors } from "./field-errors";
import { HTMLInputTypeAttribute } from "react";

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
      <div className="text-sm">{label}</div>
      <div className="mt-1">
        <input
          type={type}
          name={field.name}
          placeholder={placeholder}
          className="py-1 px-2 rounded border border-gray-300 w-full"
        />
      </div>
      {field.errors && <FieldErrors errors={field.errors} />}
    </>
  );
}
