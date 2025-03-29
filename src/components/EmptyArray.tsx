import { Alert, AlertTitle, AlertDescription } from "./shadcn/alert";

export default function EmptyArray({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
