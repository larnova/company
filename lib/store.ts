import { getStore, type Store } from "@netlify/blobs";
import { promises as fs } from "fs";
import path from "path";

/**
 * Data store. Uses Netlify Blobs in production (and under `netlify dev`); under
 * a plain `next dev` it transparently falls back to local JSON files so the
 * full admin flow is testable without the Netlify CLI.
 */

export type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string; // Full-time, Internship, Contract…
  description: string;
  applyUrl: string;
  createdAt: string;
};

type WithExpiry = { email: string; expiresAt: number };

const STORE_NAME = "larnova";
const DATA_DIR = path.join(process.cwd(), ".company-data");

function netlifyStore(): Store | null {
  try {
    return getStore({ name: STORE_NAME, consistency: "strong" });
  } catch {
    return null;
  }
}

function keyToFile(key: string): string {
  return path.join(DATA_DIR, `${key.replace(/[^a-zA-Z0-9_-]/g, "_")}.json`);
}

async function kvGet<T>(key: string, fallback: T): Promise<T> {
  const store = netlifyStore();
  if (store) {
    const data = await store.get(key, { type: "json" });
    return (data as T) ?? fallback;
  }
  try {
    return JSON.parse(await fs.readFile(keyToFile(key), "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  const store = netlifyStore();
  if (store) {
    await store.setJSON(key, value);
    return;
  }
  const file = keyToFile(key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

async function kvDelete(key: string): Promise<void> {
  const store = netlifyStore();
  if (store) {
    await store.delete(key);
    return;
  }
  await fs.rm(keyToFile(key), { force: true });
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// ── Jobs ──────────────────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  return kvGet<Job[]>("jobs", []);
}
export async function saveJobs(jobs: Job[]): Promise<void> {
  await kvSet("jobs", jobs);
}

// ── Magic tokens (15 min, single use) ─────────────────────────────
export async function createMagicToken(email: string): Promise<string> {
  const token = crypto.randomUUID();
  await kvSet(`magic_${token}`, {
    email: normalizeEmail(email),
    expiresAt: Date.now() + 15 * 60 * 1000,
  });
  return token;
}
export async function consumeMagicToken(token: string): Promise<string | null> {
  const key = `magic_${token}`;
  const data = await kvGet<WithExpiry | null>(key, null);
  await kvDelete(key);
  if (!data || data.expiresAt < Date.now()) return null;
  return data.email;
}

// ── Sessions (30 days) ────────────────────────────────────────────
export async function createSession(email: string): Promise<string> {
  const id = crypto.randomUUID();
  await kvSet(`session_${id}`, {
    email: normalizeEmail(email),
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  });
  return id;
}
export async function getSessionEmail(id: string): Promise<string | null> {
  const data = await kvGet<WithExpiry | null>(`session_${id}`, null);
  if (!data || data.expiresAt < Date.now()) return null;
  return data.email;
}
export async function deleteSession(id: string): Promise<void> {
  await kvDelete(`session_${id}`);
}
