"use client";

import { SessionContext } from "@/utils/context";
import { SessionPayload } from "@/utils/types";

export default function SessionContextProvider({
  session,
  children,
}: {
  session: SessionPayload | null;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
