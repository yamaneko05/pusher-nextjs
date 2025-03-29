import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "./types";
import { cookies } from "next/headers";
import { cache } from "react";
import { unauthorized } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedSecretKey = new TextEncoder().encode(secretKey);

async function getSession() {
  const session = (await cookies()).get("session")?.value;
  return session;
}

async function decryptSession(session: string) {
  const { payload } = await jwtVerify<SessionPayload>(
    session,
    encodedSecretKey,
    {
      algorithms: ["HS256"],
    },
  );

  return payload;
}

export const getSessionPayload = cache(async () => {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const payload = await decryptSession(session);
  return payload;
});

export async function getSessionPayloadOrUnauthorized() {
  const payload = await getSessionPayload();
  if (!payload) {
    unauthorized();
  }
  return payload;
}

function encryptSession(payload: SessionPayload) {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecretKey);
  return jwt;
}

export async function createSession(payload: SessionPayload) {
  const jwt = await encryptSession(payload);
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set("session", jwt, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = await getSession();
  if (!session) {
    throw new Error("session is undefined");
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
