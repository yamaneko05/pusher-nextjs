import UpdateUserForm from "@/components/form/UpdateUserForm";
import Bottombar from "@/components/layout/BottomBar";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/shadcn/button";
import { UserRepository } from "@/repositories/UserRepository";
import { AuthService } from "@/services/AuthService";
import { getSessionPayloadOrUnauthorized } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const payload = await getSessionPayloadOrUnauthorized();

  const userRepository = new UserRepository();
  const user = await userRepository.findById(payload.user.id);

  const handleSignoutButtonClick = async () => {
    "use server";

    const authService = new AuthService();
    await authService.signout();

    redirect("/signin");
  };

  return (
    <>
      <div className="p-3 pb-24">
        <div>
          <SectionHeading>プロフィール</SectionHeading>
          <div className="mt-3 max-w-96">
            <UpdateUserForm user={user!} />
          </div>
        </div>
        <div className="mt-6">
          <SectionHeading>アカウント</SectionHeading>
          <div className="mt-3">
            <Button onClick={handleSignoutButtonClick} variant={"secondary"}>
              ログアウト
            </Button>
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
}
