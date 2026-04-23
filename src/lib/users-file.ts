import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { PublicUser, UserRecord, UserProfile } from "@/types/user";

const USERS_PATH = () => join(process.cwd(), "src", "data", "users.json");

export async function readUsers(): Promise<UserRecord[]> {
  const raw = await readFile(USERS_PATH(), "utf8");
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) return [];
  return data as UserRecord[];
}

async function writeUsers(users: UserRecord[]): Promise<void> {
  await writeFile(USERS_PATH(), JSON.stringify(users, null, 2), "utf8");
}

export function toPublicUser(u: UserRecord): PublicUser {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    profile: u.profile,
  };
}

export async function findUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const users = await readUsers();
  const e = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === e) ?? null;
}

export async function getUserById(
  id: string
): Promise<UserRecord | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function addUser(record: UserRecord): Promise<void> {
  const users = await readUsers();
  if (users.some((u) => u.email.toLowerCase() === record.email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  users.push(record);
  await writeUsers(users);
}

export async function updateUser(
  id: string,
  patch: { name?: string; profile?: UserProfile }
): Promise<UserRecord | null> {
  const users = await readUsers();
  const i = users.findIndex((u) => u.id === id);
  if (i < 0) return null;
  if (patch.name !== undefined) users[i].name = patch.name;
  if (patch.profile !== undefined) {
    users[i].profile = { ...users[i].profile, ...patch.profile };
  }
  await writeUsers(users);
  return users[i];
}
