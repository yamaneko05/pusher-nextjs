import { Alert, AlertTitle, AlertDescription } from "@/components/shadcn/alert";

export default function NoRequests() {
  return (
    <Alert>
      <AlertTitle>受け取った申請はありません</AlertTitle>
      <AlertDescription>
        友達にユーザー名を教えて申請してもらいましょう
      </AlertDescription>
    </Alert>
  );
}
