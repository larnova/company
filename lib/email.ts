/**
 * Email via Resend (https://resend.com) when RESEND_API_KEY is set. Without a
 * key, the link is logged to the server console so the admin flow still works.
 */

const FROM = process.env.EMAIL_FROM || "Larnova <noreply@larnova.co>";

export async function sendMagicLink(email: string, url: string): Promise<void> {
  const subject = "Your Larnova admin sign-in link";
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;color:#111">
      <h2>Sign in to Larnova admin</h2>
      <p>Use the button below to access the site dashboard. This link expires in
         15 minutes and can only be used once.</p>
      <p style="margin:28px 0">
        <a href="${url}" style="background:#111;color:#fff;padding:12px 20px;
           border-radius:10px;text-decoration:none;font-weight:600">
          Open dashboard
        </a>
      </p>
      <p style="color:#666;font-size:13px">If you didn't request this, you can
         safely ignore this email.</p>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`\n[email:dev] Admin magic link for ${email}:\n${url}\n`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: email, subject, html }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend failed (${res.status}): ${detail}`);
  }
}
