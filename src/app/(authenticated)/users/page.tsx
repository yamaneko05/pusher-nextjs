import SearchUserCard from "@/components/search-user-card";
import Bottombar from "@/components/layout/bottombar";
import PageHeader from "@/components/layout/page-header";

export default async function Page() {
  return (
    <>
      <PageHeader pageHeading="ユーザー検索" prevHref="/" />
      <div className="p-3 pb-24">
        <SearchUserCard />
      </div>
      <Bottombar />
    </>
  );
}
