"use client";

import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="w-11/12 mx-auto">
      <div className="rounded-3xl lg:rounded-4xl bg-gray-100 px-6 py-12 lg:px-16 lg:py-16">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-14">
          <div className="lg:basis-1/2">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Follow the mission
            </h3>
            <p className="mt-3 text-base lg:text-lg text-gray-600">
              Updates on what we&apos;re building, where we&apos;re headed, and
              the ideas driving us, straight to your inbox. No noise.
            </p>
          </div>
          <div className="lg:basis-1/2 mt-7 lg:mt-0 w-full">
            {status === "done" ? (
              <div className="rounded-xl border border-gray-300 bg-white px-5 py-4 text-gray-900 font-medium">
                You&apos;re in. Welcome to the journey. 🚀
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 border border-gray-300 bg-white rounded-xl px-4 py-3.5 text-base outline-none focus:border-gray-900 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 bg-[url('/text-bg-v2.png')] bg-cover bg-top text-white font-bold px-7 py-3.5 rounded-xl hover:text-white/70 cursor-pointer transition-all disabled:opacity-70"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">{message}</p>
            )}
            <p className="mt-4 text-xs text-gray-500">
              By subscribing you agree to receive updates from Larnova and to our{" "}
              <a href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </a>
              . You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
