import { NextResponse } from "next/server";
import { consumeMagicToken, createSession } from "@/lib/store";
import { SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Relative redirect keeps the browser on the domain it actually used and drops
// the one-time token from the URL.
function redirectTo(path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const email = token ? await consumeMagicToken(token) : null;

  if (!email) return redirectTo("/manage?error=invalid");

  const sessionId = await createSession(email);
  const res = redirectTo("/manage");
  res.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return res;
}
