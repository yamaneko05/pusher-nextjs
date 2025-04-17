import { Alert, AlertTitle, AlertDescription } from "@/components/shadcn/alert";

export default function NoFriends() {
  return (
    <Alert>
      <AlertTitle>友達がいません</AlertTitle>
      <AlertDescription>
        ユーザー検索から友達を探して友達申請してください
      </AlertDescription>
    </Alert>
  );
}
