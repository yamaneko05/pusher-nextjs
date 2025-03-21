import { createContext } from "react";
import { SessionPayload } from "./types";

export const SessionContext = createContext<SessionPayload | null>(null);
