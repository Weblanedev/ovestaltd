import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;

type Payload = { userId: string; exp: number };

export const SESSION_COOKIE_NAME = "ovesta_session";

function encodePayload(data: Payload): string {
  return Buffer.from(JSON.stringify(data), "utf8").toString("base64url");
}

function decodePayload(s: string): Payload | null {
  try {
    const raw = Buffer.from(s, "base64url").toString("utf8");
    const data = JSON.parse(raw) as Payload;
    if (typeof data.userId !== "string" || typeof data.exp !== "number")
      return null;
    return data;
  } catch {
    return null;
  }
}

export function createSessionToken(userId: string, secret: string): string {
  const payload = encodePayload({
    userId,
    exp: Date.now() + MAX_AGE_MS,
  });
  const sig = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function parseSessionToken(
  token: string,
  secret: string
): { userId: string } | null {
  const dot = token.indexOf(".");
  if (dot < 0) return null;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const data = decodePayload(payloadB64);
  if (!data) return null;
  if (Date.now() > data.exp) return null;
  return { userId: data.userId };
}

export function getSessionSecret(): string | undefined {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "development")
    return "dev-ovesta-session-change-in-production";
  return undefined;
}
