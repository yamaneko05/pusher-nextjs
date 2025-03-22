import SearchUser from "@/components/search-user";
import Bottombar from "@/components/layout/bottombar";
import SectionHeading from "@/components/section-heading";

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
