import SignupForm from "@/components/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="font-bold text-xl">サインアップ</div>
      <div className="mt-9">
        <SignupForm />
      </div>
      <div className="mt-6 text-center text-sm">
        アカウントを既にお持ちですか？
        <Link href={"/signin"} className="underline underline-offset-4">
          ログイン
        </Link>
      </div>
    </>
  );
}
