import { FieldMetadata } from "@conform-to/react";
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
          className="p-2 rounded border border-gray-300 w-full"
        />
      </div>
      <div className="pt-1 h-8">
        {field.errors?.map((error, i) => (
          <div key={i} className="text-xs text-red-500">
            {error}
          </div>
        ))}
      </div>
    </>
  );
}
