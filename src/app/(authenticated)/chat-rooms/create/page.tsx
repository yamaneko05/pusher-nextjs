import CreateChatRoomForm from "@/components/create-chat-room-form";
import PageHeading from "@/components/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  return (
    <>
      <PageHeading>新しいチャットルームを作成</PageHeading>
      <div className="mt-4">
        <Card className="w-80">
          <CardContent>
            <CreateChatRoomForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
