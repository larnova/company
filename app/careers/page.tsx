import { Metadata } from "next";
import Link from "next/link";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getJobs } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers — Larnova",
  description:
    "Help build what doesn't exist yet. Larnova is always looking for audacious, exceptional people to drive the next frontier of innovation.",
  icons: "/logo-metadata.png",
};

const reasons = [
  {
    title: "Work on the frontier",
    body: "We take on foundational, ambiguous problems — the kind where the playbook hasn't been written yet. You'll do the most important work of your career.",
  },
  {
    title: "Real ownership",
    body: "Small team, huge surface area. You won't be a cog — you'll own outcomes that matter and see your work ship to the real world.",
  },
  {
    title: "Build from here",
    body: "We're proving that world-class innovation can be driven from Africa. Be part of writing that story from the ground floor.",
  },
];

export default async function Careers() {
  const jobs = await getJobs();

  return (
    <div>
      <Navigation />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="w-11/12 lg:w-8/12 mx-auto mt-16 lg:mt-28 text-center">
        <p className="text-sm lg:text-base font-semibold tracking-widest uppercase text-gray-400">
          Careers
        </p>
        <h1 className="mt-4 text-4xl lg:text-7xl font-bold leading-tight bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
          Help build what doesn&apos;t exist yet
        </h1>
        <p className="mt-6 lg:text-2xl text-gray-600 leading-relaxed">
          We&apos;re looking for audacious people who&apos;d rather invent the
          future than wait for it. If that&apos;s you, we should talk.
        </p>
      </section>

      {/* ── Why Larnova ──────────────────────────────── */}
      <section className="w-11/12 lg:w-10/12 mx-auto mt-20 lg:mt-28">
        <h2 className="text-3xl lg:text-5xl font-medium text-center mb-12 lg:mb-16 bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
          Why Larnova
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-gray-200 p-8 lg:p-10"
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                {title}
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open roles ───────────────────────────────── */}
      <section className="w-11/12 lg:w-8/12 mx-auto mt-24 lg:mt-32">
        <h2 className="text-3xl lg:text-5xl font-medium text-center mb-12 lg:mb-16 bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
          Open roles
        </h2>

        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => {
              const external = /^https?:\/\//i.test(job.applyUrl);
              return (
                <div
                  key={job.id}
                  className="rounded-3xl border border-gray-200 p-7 lg:p-9 transition-colors hover:border-gray-400"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-gray-500">
                        {job.team} · {job.location} · {job.type}
                      </p>
                      <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>
                    <Link
                      href={job.applyUrl}
                      target={external ? "_blank" : undefined}
                      className="shrink-0 self-start"
                    >
                      <button className="bg-[url('/text-bg-v2.png')] bg-cover bg-top text-white font-bold px-6 py-2.5 rounded-xl hover:text-white/70 cursor-pointer transition-all">
                        Apply
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl lg:rounded-4xl bg-gray-100 px-8 py-14 lg:px-16 lg:py-20 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
              No open roles right now — reach out anyway.
            </h3>
            <p className="mt-4 lg:text-lg text-gray-600 leading-relaxed">
              We&apos;re always looking for exceptional engineers, researchers,
              and builders. Tell us what you want to build and why it matters.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="mailto:careers@larnova.co?subject=I%20want%20to%20build%20with%20Larnova">
                <button className="bg-[url('/text-bg-v2.png')] bg-cover bg-top text-white font-bold px-7 py-3 rounded-xl hover:text-white/70 cursor-pointer transition-all">
                  Introduce yourself
                </button>
              </Link>
              <Link href="https://laig.larnova.co" target="_blank">
                <button className="border-2 border-gray-200 text-gray-700 font-bold px-7 py-3 rounded-xl hover:border-gray-400 cursor-pointer transition-all">
                  Students: join LAIG
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>

      <div className="mt-10" />
      <Footer />
    </div>
  );
}
