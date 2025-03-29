import CreateRoomForm from "@/components/form/CreateRoomForm";
import Bottombar from "@/components/layout/BottomBar";
import SectionHeading from "@/components/SectionHeading";

export default async function Page() {
  return (
    <>
      <div className="p-3 pb-24">
        <SectionHeading>新しいチャットルームを作成</SectionHeading>
        <div className="mt-3 max-w-96">
          <CreateRoomForm />
        </div>
      </div>
      <Bottombar />
    </>
  );
}
