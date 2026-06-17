import { createMagicToken, normalizeEmail } from "@/lib/store";
import { sendMagicLink } from "@/lib/email";
import { isAdmin, siteOrigin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    email = normalizeEmail(String((await request.json()).email || ""));
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
  }

  // Only send links to authorized admins; respond identically either way.
  if (isAdmin(email)) {
    try {
      const token = await createMagicToken(email);
      const url = `${siteOrigin(request)}/api/auth/verify?token=${token}`;
      await sendMagicLink(email, url);
    } catch (err) {
      console.error("Failed to send admin link:", err);
      return Response.json(
        { ok: false, error: "Could not send the sign-in email. Try again." },
        { status: 500 }
      );
    }
  }

  return Response.json({
    ok: true,
    message: "If that email can manage this site, a sign-in link is on its way.",
  });
}
