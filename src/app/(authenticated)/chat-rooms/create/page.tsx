import CreateRoomForm from "@/components/form/create-room-form";
import Bottombar from "@/components/layout/bottombar";
import PageHeader from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  return (
    <>
      <PageHeader pageHeading="新しいチャットルームを作成" prevHref="/" />
      <div className="p-3 pb-24">
        <Card className="max-w-96">
          <CardContent>
            <CreateRoomForm />
          </CardContent>
        </Card>
      </div>
      <Bottombar />
    </>
  );
}
