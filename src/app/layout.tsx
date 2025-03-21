import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { getSessionPayload } from "@/utils/session";
import SessionContextProvider from "@/components/session-context-provider";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionPayload();

  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <SessionContextProvider session={session ?? null}>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}
