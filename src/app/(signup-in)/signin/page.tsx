import SigninForm from "@/components/signin-form";
import Link from "next/link";

export default function signin() {
  return (
    <>
      <div className="text-center font-bold">ログイン</div>
      <div className="mt-9">
        <SigninForm />
      </div>
      <div className="mt-2">
        <Link href={"/signup"} className="text-sky-500 text-sm">
          サインアップ
        </Link>
      </div>
    </>
  );
}
