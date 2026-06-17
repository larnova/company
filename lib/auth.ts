import { cookies } from "next/headers";
import { getSessionEmail, normalizeEmail } from "./store";

export const SESSION_COOKIE = "larnova_admin";

const ADMIN_DOMAINS = ["larnova.co"];

/** Admins can manage the site. Allowlist via env, plus larnova domains. */
export function isAdmin(email: string): boolean {
  const e = normalizeEmail(email);
  const allow = (process.env.COMPANY_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (allow.includes(e)) return true;
  const domain = e.split("@")[1] || "";
  return ADMIN_DOMAINS.includes(domain);
}

/** The signed-in admin's email, or null if not signed in / not an admin. */
export async function getAdminEmail(): Promise<string | null> {
  const store = await cookies();
  const id = store.get(SESSION_COOKIE)?.value;
  if (!id) return null;
  const email = await getSessionEmail(id);
  if (!email || !isAdmin(email)) return null;
  return email;
}

export function siteOrigin(request: Request): string {
  const explicit = process.env.SITE_URL || process.env.URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const h = request.headers;
  const host = h.get("x-forwarded-host") || h.get("host") || "";
  const isLocal = host.startsWith("localhost") || host.startsWith("127.");
  const proto = h.get("x-forwarded-proto") || (isLocal ? "http" : "https");
  return `${proto}://${host}`;
}
