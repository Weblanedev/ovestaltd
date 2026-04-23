import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { addUser, findUserByEmail, toPublicUser } from "@/lib/users-file";
import { createSessionToken, getSessionSecret, SESSION_COOKIE_NAME } from "@/lib/session";
import { cookies } from "next/headers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const secret = getSessionSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  let body: { email?: string; password?: string; name?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string; name?: string };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const password = body.password ?? "";
  const name = (body.name ?? "").trim() || email.split("@")[0] || "User";

  if (!EMAIL_RE.test(email) || password.length < 8) {
    return NextResponse.json(
      { error: "Valid email and password (8+ characters) are required." },
      { status: 400 }
    );
  }

  if (await findUserByEmail(email)) {
    return NextResponse.json(
      { error: "This email is already registered." },
      { status: 409 }
    );
  }

  const id = randomUUID();
  const passwordHash = await hashPassword(password);
  const createdAt = new Date().toISOString();

  try {
    await addUser({
      id,
      email: email.toLowerCase(),
      passwordHash,
      name,
      profile: {},
      createdAt,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not register";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const token = createSessionToken(id, secret);
  const c = await cookies();
  c.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}
