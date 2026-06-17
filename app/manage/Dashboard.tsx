"use client";

import { useState } from "react";
import type { Job } from "@/lib/store";

const EMPTY = {
  title: "",
  team: "",
  location: "",
  type: "Full-time",
  description: "",
  applyUrl: "",
};

export default function Dashboard({
  email,
  initialJobs,
}: {
  email: string;
  initialJobs: Job[];
}) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  async function addJob(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok || !data.ok) {
      setError(data.error || "Could not add the job.");
      return;
    }
    setJobs((prev) => [data.job, ...prev]);
    setForm(EMPTY);
  }

  async function removeJob(id: string) {
    const prev = jobs;
    setJobs((x) => x.filter((j) => j.id !== id));
    const res = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
    if (!res.ok) setJobs(prev);
  }

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Larnova Admin</h1>
            <p className="text-xs text-gray-500">Signed in as {email}</p>
          </div>
          <button
            onClick={signOut}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Add job */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Post a job</h2>
          <form onSubmit={addJob} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" value={form.title} onChange={set("title")} placeholder="Founding ML Engineer" />
              <Field label="Team" value={form.team} onChange={set("team")} placeholder="Research" />
              <Field label="Location" value={form.location} onChange={set("location")} placeholder="Remote / Abuja" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => set("type")(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description")(e.target.value)}
                placeholder="What they'll do, what we're looking for…"
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-gray-900"
              />
            </div>
            <Field
              label="Apply link (URL or mailto)"
              value={form.applyUrl}
              onChange={set("applyUrl")}
              placeholder="mailto:careers@larnova.co or https://…"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
            >
              {saving ? "Posting…" : "Post job"}
            </button>
          </form>
        </section>

        {/* Existing jobs */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Open roles ({jobs.length})
          </h2>
          {jobs.length === 0 ? (
            <p className="text-sm text-gray-500">
              No roles posted yet. The careers page shows a “reach out” message
              until you add one.
            </p>
          ) : (
            <div className="space-y-3">
              {jobs.map((j) => (
                <div
                  key={j.id}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{j.title}</p>
                    <p className="text-xs text-gray-500">
                      {j.team} · {j.location} · {j.type}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {j.description}
                    </p>
                  </div>
                  <button
                    onClick={() => removeJob(j.id)}
                    className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-gray-900"
      />
    </div>
  );
}
