import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/server-auth";
import { toPublicUser, updateUser } from "@/lib/users-file";
import type { UserProfile } from "@/types/user";

export async function PATCH(request: Request) {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { name?: string; profile?: UserProfile };
  try {
    body = (await request.json()) as { name?: string; profile?: UserProfile };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name =
    body.name !== undefined
      ? String(body.name).trim() || user.name
      : undefined;
  const profile = body.profile;

  const updated = await updateUser(user.id, {
    ...(name !== undefined ? { name } : {}),
    ...(profile !== undefined ? { profile } : {}),
  });
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ user: toPublicUser(updated) });
}
