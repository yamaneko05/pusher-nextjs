import PageHeading from "@/components/page-heading";
import { getPublicUrl } from "@/utils/storage";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

export default async function Page() {
  const { data: avatars } = await supabase.storage.from("avatars").list();

  return (
    <>
      <PageHeading>avatars backet のファイル一覧</PageHeading>
      <div className="grid grid-cols-6 gap-2 mt-4">
        {avatars?.map((avatar) => (
          <Image
            key={avatar.id}
            src={getPublicUrl("avatars", avatar.name)}
            alt=""
            width={300}
            height={300}
          />
        ))}
      </div>
    </>
  );
}
