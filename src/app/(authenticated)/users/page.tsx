import SearchUser from "@/components/SearchUser";
import Bottombar from "@/components/layout/BottomBar";
import SectionHeading from "@/components/SectionHeading";

export default async function Page() {
  return (
    <>
      <div className="p-3 pb-24">
        <SectionHeading>ユーザー検索</SectionHeading>
        <div className="mt-3 max-w-96">
          <SearchUser />
        </div>
      </div>
      <Bottombar />
    </>
  );
}
