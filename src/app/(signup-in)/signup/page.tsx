import SignupForm from "@/components/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="text-center font-bold">サインアップ</div>
      <div className="mt-9">
        <SignupForm />
      </div>
      <div className="mt-4">
        <Link href={"/signin"} className="text-sky-500 text-sm">
          サインイン
        </Link>
      </div>
    </>
  );
}
