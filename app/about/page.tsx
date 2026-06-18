import { Metadata } from "next";
import Link from "next/link";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "About: Larnova",
  description:
    "Larnova is a driver of innovation, challenging the status quo to build what doesn't yet exist, from Africa, for the world.",
  icons: "/logo-metadata.png",
};

const beliefs = [
  {
    title: "The status quo is a starting point, not a ceiling",
    body: "Most things are the way they are because nobody dared to change them. We dare. We start from first principles and rebuild what doesn't hold up.",
  },
  {
    title: "Audacity is a strategy",
    body: "The biggest leaps look delusional right up until they're obvious. We choose the audacious path on purpose, and then we execute relentlessly.",
  },
  {
    title: "Great ideas can come from anywhere",
    body: "Groundbreaking innovation shouldn't depend on where you were born. We're proving the next frontier can be driven from Africa.",
  },
  {
    title: "Build it for real",
    body: "We don't stop at vision decks and demos. Ideas only matter when they ship and create value in the real world.",
  },
];

export default function About() {
  return (
    <div>
      <Navigation />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="w-11/12 lg:w-8/12 mx-auto mt-16 lg:mt-28 text-center">
        <p className="text-sm lg:text-base font-semibold tracking-widest uppercase text-gray-400">
          About Larnova
        </p>
        <h1 className="mt-4 text-4xl lg:text-7xl font-bold leading-tight bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
          We exist to challenge the status quo
        </h1>
        <p className="mt-6 text-base lg:text-lg text-gray-600 leading-relaxed">
          Larnova is a driver of innovation, turning audacious zero to one
          ideas into technology that moves the world forward. We build what
          others call impossible, from Africa, for everyone.
        </p>
      </section>

      {/* ── Story ────────────────────────────────────── */}
      <section className="w-11/12 lg:w-7/12 mx-auto mt-20 lg:mt-28 space-y-6 text-base lg:text-lg text-gray-700 leading-relaxed">
        <h2 className="text-3xl lg:text-5xl font-medium bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
          Our story
        </h2>
        <p>
          Larnova was born from a simple refusal: to accept{" "}
          <span className="font-semibold text-gray-900">
            &ldquo;that&apos;s just how it&apos;s done.&rdquo;
          </span>{" "}
          We&apos;re a team of audacious visionaries, or delusionists as some might call us, convinced that the boldest technology of the next
          decade can be invented here, not just imported.
        </p>
        <p>
          So we build. We go after foundational problems most people consider
          too hard, too early, or too far from the spotlight, and we turn them
          into real products. Today that conviction points at the next frontier
          of intelligence and the people who will build it. Tomorrow, it points
          at whatever the future demands next.
        </p>
      </section>

      {/* ── What we believe ──────────────────────────── */}
      <section className="bg-gray-100 mt-24 lg:mt-32 py-16 lg:py-24">
        <div className="w-11/12 lg:w-10/12 mx-auto">
          <h2 className="text-3xl lg:text-5xl font-medium text-center mb-12 lg:mb-16 bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
            What we believe
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {beliefs.map(({ title, body }) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100"
              >
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-3 text-base lg:text-lg text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we're building ──────────────────────── */}
      <section className="w-11/12 lg:w-7/12 mx-auto mt-24 lg:mt-32 text-center">
        <h2 className="text-3xl lg:text-5xl font-medium bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
          What we&apos;re building now
        </h2>
        <p className="mt-5 text-base lg:text-lg text-gray-600 leading-relaxed">
          Our current frontier is intelligence built for the real world
          through{" "}
          <Link
            href="https://lokolm.larnova.co"
            target="_blank"
            className="font-semibold text-gray-900 underline underline-offset-4"
          >
            Lokolm
          </Link>
          , a foundational model for the African context, and the{" "}
          <Link
            href="https://laig.larnova.co"
            target="_blank"
            className="font-semibold text-gray-900 underline underline-offset-4"
          >
            Larnova AI Group
          </Link>
          , the student research network growing the talent to build it.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/careers">
            <button className="bg-[url('/text-bg-v2.png')] bg-cover bg-top text-white font-bold px-7 py-3 rounded-xl hover:text-white/70 cursor-pointer transition-all">
              Build with us
            </button>
          </Link>
          <Link href="/contact">
            <button className="border-2 border-gray-200 text-gray-700 font-bold px-7 py-3 rounded-xl hover:border-gray-400 cursor-pointer transition-all">
              Get in touch
            </button>
          </Link>
        </div>
      </section>

      <div className="mt-24 lg:mt-32" />
      <Newsletter />
      <Footer />
    </div>
  );
}
