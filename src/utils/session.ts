import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "./definitions";
import { cookies } from "next/headers";
import { cache } from "react";

const secretKey = process.env.SESSION_SECRET;
const encodedSecretKey = new TextEncoder().encode(secretKey);

function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecretKey);
}

async function decryptSession(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedSecretKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error: unknown) {
    console.log("Failed to verify session");
  }
}

export async function createSession(payload: SessionPayload) {
  const session = await encryptSession(payload);
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decryptSession(session);

  if (!session || !payload) {
    return null;
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

export const getSessionPayload = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const payload = await decryptSession(cookie);

  return payload;
});
