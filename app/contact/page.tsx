import { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Contact — Larnova",
  description:
    "Get in touch with Larnova — partnerships, press, and questions about Lokolm and the Larnova AI Group.",
  icons: "/logo-metadata.png",
};

const contactCards = [
  {
    title: "Email",
    value: "contact@larnova.co",
    href: "mailto:contact@larnova.co",
  },
  {
    title: "Phone",
    value: "+234 906 900 5475",
    href: "tel:+2349069005475",
  },
  {
    title: "Office",
    value:
      "NO 1, S.A. Mbaka Close, Off Shining Star Street, Phase 2 Site 2, Kubwa, FCT, Abuja.",
  },
];

const engageCards = [
  {
    title: "Partner with us",
    description:
      "Research collaborations, data partnerships, and pilots built on our models.",
    cta: "Start a conversation",
    href: "mailto:contact@larnova.co?subject=Partnership%20enquiry",
  },
  {
    title: "Build with Lokolm",
    description:
      "Explore the foundational model made for the African context, or contribute data.",
    cta: "Discover Lokolm",
    href: "https://lokolm.larnova.co",
    external: true,
  },
  {
    title: "Join the AI Group",
    description:
      "Students: start or join a LAIG chapter and help build Africa's AI.",
    cta: "Visit LAIG",
    href: "https://laig.larnova.co",
    external: true,
  },
];

export default function Contact() {
  return (
    <div>
      <Navigation />

      {/* ── Header ───────────────────────────────────── */}
      <section className="w-11/12 lg:w-7/12 mx-auto mt-16 lg:mt-24 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
          Let&apos;s talk
        </h1>
        <p className="mt-4 lg:text-xl text-gray-600">
          Whether you&apos;re a partner, a researcher, the press, or a student
          who wants in — we&apos;d love to hear from you.
        </p>
      </section>

      {/* ── Contact details ──────────────────────────── */}
      <section className="w-10/12 mx-auto mt-14 mb-8">
        <div className="grid gap-5 md:grid-cols-3">
          {contactCards.map(({ title, value, href }) => {
            const inner = (
              <div className="h-full rounded-2xl border border-gray-200 p-8 transition-colors hover:border-gray-400">
                <h3 className="font-bold text-xl bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
                  {title}
                </h3>
                <p className="mt-3 text-gray-700">{value}</p>
              </div>
            );
            return href ? (
              <Link key={title} href={href}>
                {inner}
              </Link>
            ) : (
              <div key={title}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* ── Ways to engage ───────────────────────────── */}
      <section className="w-10/12 mx-auto mt-20">
        <h2 className="text-2xl lg:text-4xl font-medium text-center mb-10 lg:mb-14 bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
          Ways to work with us
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {engageCards.map(({ title, description, cta, href, external }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-gray-200 p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
              <p className="mt-3 text-gray-600 flex-1">{description}</p>
              <Link
                href={href}
                target={external ? "_blank" : undefined}
                className="mt-6 inline-flex items-center gap-1 font-bold bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent w-fit"
              >
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10" />
      <Footer />
    </div>
  );
}
