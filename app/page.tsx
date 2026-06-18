"use client";

import { useRef, useEffect } from "react";

import NextImage from "next/image";
import Link from "next/link";
import {
  Lightbulb,
  Globe2,
  Rocket,
  Users,
  GraduationCap,
  Upload,
  Briefcase,
  Mail,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import useImageLoaded from "@/hooks/useImageLoaded";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";

// What drives us — the innovation ethos, not a sales pitch.
const principlesData = [
  {
    icon: Lightbulb,
    title: "Question everything",
    description:
      "We start from first principles, not convention. If the status quo doesn't hold up, we rebuild it from the ground up.",
  },
  {
    icon: Globe2,
    title: "Built for the real world",
    description:
      "We build for the contexts, languages, and edge cases that global products overlook, creating technology that fits the people who use it.",
  },
  {
    icon: Rocket,
    title: "Research to product",
    description:
      "We don't stop at papers and demos. Our ideas ship as real products that create value on the ground.",
  },
  {
    icon: Users,
    title: "Talent as infrastructure",
    description:
      "Great innovation needs great builders, so we grow the engineers and researchers who will build the future.",
  },
];

// Ways to get involved.
const involveData = [
  {
    icon: GraduationCap,
    title: "Join the AI Group",
    description: "Start or join a LAIG chapter and build with us on campus.",
    cta: "Visit LAIG",
    href: "https://laig.larnova.co",
    external: true,
    tile: "from-violet-500 to-indigo-500",
    glow: "group-hover:shadow-violet-500/30",
  },
  {
    icon: Upload,
    title: "Contribute to Lokolm",
    description: "Upload localized data that teaches the model how Africa speaks.",
    cta: "Contribute",
    href: "https://lokolm.larnova.co/contribute",
    external: true,
    tile: "from-amber-400 to-orange-500",
    glow: "group-hover:shadow-amber-500/30",
  },
  {
    icon: Briefcase,
    title: "Build with us",
    description: "We're always looking for audacious engineers and researchers.",
    cta: "See careers",
    href: "/careers",
    tile: "from-emerald-400 to-teal-500",
    glow: "group-hover:shadow-emerald-500/30",
  },
  {
    icon: Mail,
    title: "Partner with us",
    description: "Research collaborations, data partnerships, and pilots.",
    cta: "Get in touch",
    href: "/contact",
    tile: "from-sky-400 to-blue-500",
    glow: "group-hover:shadow-sky-500/30",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isImageLoaded] = useImageLoaded(
    "/images/home-bg-wb.png",
    containerRef
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Video autoplay failed on first load:", err);
      });
    }
  }, []);

  return (
    <div>
      <Navigation />

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        ref={containerRef}
        className={`${
          isImageLoaded ? "slide" : ""
        } relative w-full bg-scroll md:bg-fixed bg-cover bg-[left_top] lg:bg-[center_top] h-[calc(100dvh-57px)] overflow-hidden`}
      >
        <div className="flex flex-col gap-5 justify-end h-full w-full absolute top-0 bg-gradient-to-b from-[#000000f5] to-[#0000000c] p-8">
          <p
            className={`text-center text-white/75 text-sm lg:text-xl font-light tracking-[0.28em] opacity-0 ${
              isImageLoaded ? "fadeIn" : ""
            }`}
          >
            interstellar innovations
          </p>
          <p
            className={`text-center text-white text-5xl lg:text-9xl font-bold opacity-0 ${
              isImageLoaded ? "fadeIn" : ""
            }`}
          >
            <span className="text-5xl lg:text-9xl font-extralight mr-0.5">
              be
            </span>
            Delusional
          </p>
          <div
            className={`flex flex-wrap items-center justify-center gap-3 opacity-0 ${
              isImageLoaded ? "fadeIn" : ""
            }`}
          >
            <Link href="/about">
              <button className="bg-white text-black font-bold px-7 py-3 rounded-full hover:bg-white/85 cursor-pointer transition-all">
                Our vision
              </button>
            </Link>
            <Link href="/careers">
              <button className="border border-white/70 text-white font-bold px-7 py-3 rounded-full hover:bg-white/10 cursor-pointer transition-all">
                Build with us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who we are ───────────────────────────────── */}
      <section className="w-11/12 lg:w-7/12 mt-20 lg:mt-28 mx-auto">
        <Reveal from="up" className="text-center">
          <h3 className="text-4xl lg:text-6xl text-right  font-bold bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
            Who we are
          </h3>
          <p className="mt-6 text-base lg:text-lg text-left leading-relaxed text-gray-700">
            A world where breakthrough innovation can come from{" "}
            <span className="font-semibold text-gray-900">anywhere</span>, and where
            Africa{" "}
            <span className="font-semibold text-gray-900">
              drives the global frontier
            </span>{" "}
            instead of watching from the sidelines. We&apos;re a team of{" "}
            <span className="font-semibold text-gray-900">
              audacious visionaries
            </span>
            , or as some might call us,{" "}
            <span className="font-semibold text-gray-900">delusionists</span>,
            turning <span className="font-semibold text-gray-900">zero to one</span>{" "}
            ideas into technology the world hasn&apos;t seen yet, and refusing to
            accept{" "}
            <span className="font-semibold text-gray-900">
              &ldquo;that&apos;s just how it&apos;s done.&rdquo;
            </span>
          </p>
        </Reveal>
      </section>

      {/* ── What drives us ───────────────────────────── */}
      <section className="relative mt-24 lg:mt-32 bg-gray-100 overflow-hidden py-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-violet-300/30 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-amber-200/40 blur-[130px]"
        />
        <div className="relative z-10">
          <Reveal
            from="up"
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 px-6"
          >
            <p className="text-xs lg:text-sm font-semibold uppercase tracking-[0.28em] text-gray-400">
              Our ethos
            </p>
            <h4 className="mt-4 text-4xl lg:text-6xl font-bold text-gray-900">
              What drives{" "}
              <span className="bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
                us
              </span>
            </h4>
          </Reveal>
          <div className="lg:mx-auto lg:w-[1350px]">
            <div className="flex w-full gap-5 px-5 overflow-x-auto md:flex-wrap md:overflow-visible lg:flex-nowrap pb-3 md:pb-0 mobile">
              {principlesData.map(({ icon, title, description }, index) => (
                <IconWithTitleAndDescription
                  key={index}
                  icon={icon}
                  title={title}
                  description={description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What we're building now ──────────────────── */}
      <section className="w-11/12 lg:w-7/12 mx-auto text-center mt-24 lg:mt-32">
        <h4 className="text-3xl lg:text-5xl text-right font-medium bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent">
          What we&apos;re building now
        </h4>
        <p className="mt-4 text-left text-base lg:text-lg text-gray-600">
          Vision means nothing without execution. Today, that conviction points
          at the next frontier of intelligence and the people who will build
          it.
        </p>
      </section>

      {/* ── Lokolm (a current frontier) ──────────────── */}
      <section className="relative w-11/12 mx-auto mt-12 lg:mt-16 rounded-3xl lg:rounded-4xl overflow-hidden h-[calc(100dvh-120px)] sm:h-[calc(100dvh-160px)] lg:h-[calc(100vh-90px)] min-h-[460px] sm:min-h-[500px]">
        <video
          ref={videoRef}
          src="/who-we-are.mp4"
          autoPlay
          muted
          playsInline
          controls={false}
          loop
          className="h-full w-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-end top-0 h-full w-full bg-gradient-to-b from-[#00000007] to-[#000000] p-5 sm:p-8">
          <h4 className="text-center text-white font-medium text-sm sm:text-base lg:text-xl mb-1.5">
            Lokolm
          </h4>
          <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl lg:leading-12 text-center mb-1.5 mx-auto w-11/12 sm:w-4/5 lg:w-5/6 font-bold">
            A foundational model, built for the African context
          </h3>
          <p className="text-white mb-4 text-base lg:text-lg text-center w-11/12 sm:w-4/5 mx-auto lg:w-3/5 font-medium">
            Trained on localized data, designed for agentic workflows, and made
            to understand how Africa actually speaks and does business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-10 lg:mb-14 px-4">
            <Link href="https://lokolm.larnova.co" target="_blank" className="w-full sm:w-auto max-w-xs flex justify-center">
              <button className="w-full sm:w-64 bg-[url('/text-bg-v2.png')] bg-cover bg-top text-white text-base lg:text-lg px-6 lg:px-10 py-2.5 rounded-sm font-bold hover:text-white/60 cursor-pointer transition-all">
                Discover Lokolm
              </button>
            </Link>
            <Link href="https://lokolm.larnova.co/contribute" target="_blank" className="w-full sm:w-auto max-w-xs flex justify-center">
              <button className="w-full sm:w-64 border border-white/70 text-white text-base lg:text-lg px-6 lg:px-10 py-2.5 rounded-sm font-bold hover:bg-white/10 cursor-pointer transition-all">
                Contribute Data
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Larnova AI Group (LAIG) ──────────────────── */}
      <section className="relative w-11/12 mx-auto mt-12 lg:mt-16 rounded-3xl lg:rounded-4xl overflow-hidden h-[480px] lg:h-[600px]">
        <NextImage
          src="/images/laig.jpg"
          alt="Larnova AI Group: students building Africa's AI"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-[#00000020] to-[#000000] p-5 sm:p-8">
          <h4 className="text-center text-white font-medium text-sm sm:text-base lg:text-xl mb-1.5">
            Larnova AI Group (LAIG)
          </h4>
          <h3 className="text-white text-2xl sm:text-3xl lg:text-5xl lg:leading-14 text-center mb-1.5 mx-auto w-11/12 lg:w-4/5 font-bold">
            The people building Africa&apos;s AI
          </h3>
          <p className="text-white mb-4 text-base lg:text-lg text-center w-11/12 lg:w-3/5 mx-auto font-medium">
            Our department backed student research network across Nigerian
            universities curates localized data and builds the agents that
            power Lokolm.
          </p>
          <div className="flex justify-center mb-2 px-4">
            <Link
              href="https://laig.larnova.co"
              target="_blank"
              className="w-full sm:w-auto max-w-xs flex justify-center"
            >
              <button className="w-full sm:w-64 bg-[url('/text-bg-v2.png')] bg-cover bg-top text-white text-base lg:text-lg px-6 lg:px-10 py-2.5 rounded-sm font-bold hover:text-white/60 cursor-pointer transition-all">
                Join your chapter
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Get involved ─────────────────────────────── */}
      <section className="relative mt-24 lg:mt-32 mb-28 lg:mb-40 bg-gray-100 overflow-hidden py-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-violet-300/30 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-amber-200/40 blur-[130px]"
        />
        <div className="relative z-10">
          <Reveal
            from="up"
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 px-6"
          >
            <p className="text-xs lg:text-sm font-semibold uppercase tracking-[0.28em] text-gray-400">
              Join the mission
            </p>
            <h4 className="mt-4 text-4xl lg:text-6xl font-bold text-gray-900">
              Get{" "}
              <span className="bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
                involved
              </span>
            </h4>
            <p className="mt-4 text-base lg:text-lg text-gray-600">
              However you build, there&apos;s a way in. Help shape what comes
              next.
            </p>
          </Reveal>
          <div className="lg:mx-auto lg:w-[1350px]">
            <div className="flex w-full gap-5 px-5 overflow-x-auto md:flex-wrap md:overflow-visible lg:flex-nowrap pb-3 md:pb-0 mobile">
              {involveData.map(
                ({ icon: Icon, title, description, cta, href, external, tile, glow }) => (
                  <Link
                    key={title}
                    href={href}
                    target={external ? "_blank" : undefined}
                    className={`group flex flex-col shrink-0 basis-[300px] md:basis-[calc(50%_-_0.625rem)] lg:basis-[calc(25%_-_0.9375rem)] rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-2xl ${glow}`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tile} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h5 className="mt-6 text-xl font-semibold text-gray-900">
                      {title}
                    </h5>
                    <p className="mt-2 text-base lg:text-lg leading-relaxed text-gray-600 flex-1">
                      {description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                      {cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

function IconWithTitleAndDescription({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-white rounded-4xl py-10 px-8 shrink-0 basis-[300px] md:basis-[calc(50%_-_0.625rem)] lg:basis-[calc(25%_-_0.9375rem)] border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/60">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-white transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h3 className="text-2xl lg:text-3xl font-medium mt-8">{title}</h3>
      <p className="mt-3 text-base lg:text-lg text-black/80 leading-relaxed">{description}</p>
    </div>
  );
}
