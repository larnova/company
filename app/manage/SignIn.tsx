"use client";

import { useState } from "react";

export default function SignIn({ invalid }: { invalid?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Larnova Admin</h1>
      <p className="mt-2 text-sm text-gray-600">
        Sign in to manage the site. We&apos;ll email you a secure, one-time link.
      </p>

      {invalid && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          That link was invalid or expired. Request a new one.
        </p>
      )}

      {status === "sent" ? (
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          Check your inbox — if that email can manage this site, a sign-in link
          is on its way.
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@larnova.co"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base lg:text-sm outline-none focus:border-gray-900"
          />
          {status === "error" && (
            <p className="text-sm text-red-600">{message}</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send sign-in link"}
          </button>
        </form>
      )}
    </div>
  );
}
