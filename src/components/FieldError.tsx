export default function FieldError({ errors }: { errors: string[] }) {
  return (
    <div>
      {errors?.map((error, i) => (
        <p key={i} className="text-xs text-red-500">
          {error}
        </p>
      ))}
    </div>
  );
}
