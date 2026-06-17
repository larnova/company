export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup. Adds the email to a Resend Audience.
 * Env:
 *   RESEND_API_KEY      – Resend API key
 *   RESEND_AUDIENCE_ID  – the audience to add contacts to
 * Without those set (e.g. local dev), it logs the email and returns success so
 * the form still works end-to-end.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    email = String(((await request.json()) as { email?: string }).email || "")
      .trim()
      .toLowerCase();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.log(`[newsletter:dev] would subscribe: ${email}`);
    return Response.json({ ok: true });
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }
    );

    // Resend returns 422 if the contact already exists — treat that as success.
    if (!res.ok && res.status !== 422) {
      const detail = await res.text().catch(() => "");
      console.error(`Resend subscribe failed (${res.status}): ${detail}`);
      return Response.json(
        { ok: false, error: "Could not subscribe right now. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Subscribe error:", err);
    return Response.json(
      { ok: false, error: "Could not subscribe right now. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
