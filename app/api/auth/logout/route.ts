import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth";
import { deleteSession } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST() {
  const store = await cookies();
  const id = store.get(SESSION_COOKIE)?.value;
  if (id) await deleteSession(id);
  store.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
