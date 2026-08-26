import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "mm_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12; // 12 horas

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET precisa estar configurado no .env.local");
  }
  return new TextEncoder().encode(secret);
}

export async function criarSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verificarSessionToken(token: string | undefined) {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_MAX_AGE = SESSION_DURATION_SECONDS;
