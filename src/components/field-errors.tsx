export function FieldErrors({ errors }: { errors: string[] }) {
  return (
    <div className="mt-1">
      {errors.map((error, i) => (
        <div key={i} className="text-sm text-blue-500">
          {error}
        </div>
      ))}
    </div>
  );
}
