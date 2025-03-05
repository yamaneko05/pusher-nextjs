import CreateChatRoomForm from "@/components/create-chat-room-form";
import PageHeading from "@/components/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="p-3 pb-24">
      <PageHeading>新しいチャットルームを作成</PageHeading>
      <div className="mt-4">
        <Card className="w-96">
          <CardContent>
            <CreateChatRoomForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
