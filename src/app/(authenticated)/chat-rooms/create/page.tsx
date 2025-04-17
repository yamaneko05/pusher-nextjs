import CreateRoomForm from "@/components/form/CreateRoomForm";
import Bottombar from "@/components/layout/BottomBar";
import SectionHeading from "@/components/SectionHeading";
import { UserRepository } from "@/repositories/UserRepository";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";

export default async function Page() {
  const payload = await getSessionPayloadOrUnauthorized();

  const userRepository = new UserRepository();
  const friends = await userRepository.getFriends(payload.user.id);

  return (
    <>
      <div className="p-3 pb-24">
        <SectionHeading>新しいチャットルームを作成</SectionHeading>
        <div className="mt-3 max-w-96">
          <CreateRoomForm friends={friends} />
        </div>
      </div>
      <Bottombar />
    </>
  );
}
