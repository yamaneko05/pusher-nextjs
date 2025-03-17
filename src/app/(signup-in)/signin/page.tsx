import SigninForm from "@/components/form/signin-form";
import Link from "next/link";

export default function signin() {
  return (
    <>
      <div className="text-xl font-bold">ログイン</div>
      <div className="mt-9">
        <SigninForm />
      </div>
      <div className="mt-6 text-center text-sm">
        アカウントをお持ちではありませんか？
        <Link href={"/signup"} className="underline underline-offset-4">
          サインアップ
        </Link>
      </div>
    </>
  );
}
