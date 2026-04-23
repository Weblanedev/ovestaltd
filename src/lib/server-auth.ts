import { cookies } from "next/headers";
import { getUserById, toPublicUser } from "@/lib/users-file";
import { parseSessionToken, getSessionSecret, SESSION_COOKIE_NAME } from "@/lib/session";
import type { PublicUser } from "@/types/user";

export async function getServerUser(): Promise<PublicUser | null> {
  const secret = getSessionSecret();
  if (!secret) return null;
  const c = await cookies();
  const token = c.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const p = parseSessionToken(token, secret);
  if (!p) return null;
  const user = await getUserById(p.userId);
  if (!user) return null;
  return toPublicUser(user);
}
