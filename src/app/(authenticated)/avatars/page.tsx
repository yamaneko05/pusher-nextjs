import { getPublicUrl } from "@/utils/storage";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

export default async function Page() {
  const { data: avatars } = await supabase.storage.from("avatars").list();

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
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
