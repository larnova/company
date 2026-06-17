import { Metadata } from "next";
import Link from "next/link";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Larnova",
  description:
    "How Larnova collects, uses, and protects your information — including newsletter and contact details.",
  icons: "/logo-metadata.png",
};

const sections = [
  {
    heading: "Information we collect",
    body: [
      "When you subscribe to our newsletter, we collect the email address you provide. When you contact us by email or our contact page, we collect the details you choose to share (such as your name, email, and message).",
      "We may also collect limited, non-identifying technical information (such as basic analytics about page visits) to understand how the site is used and improve it.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use your information to send you the updates you signed up for, respond to your enquiries, operate and improve our website, and keep our services secure.",
      "We do not sell your personal information.",
    ],
  },
  {
    heading: "Email and marketing consent",
    body: [
      "By subscribing, you consent to receive occasional updates from Larnova about our work, products, and community. Every email includes an unsubscribe link, and you can opt out at any time. You can also email us to be removed.",
    ],
  },
  {
    heading: "Service providers",
    body: [
      "We rely on trusted third parties to operate the site and deliver email — for example, our email provider (Resend) and our hosting provider. These providers process data only on our behalf and under their own privacy and security commitments.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep your information only for as long as it's needed for the purposes above, or as required by law. If you unsubscribe or ask us to delete your data, we'll remove it from our active records.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can request access to, correction of, or deletion of the personal information we hold about you, and you can withdraw consent for marketing at any time. To exercise these rights, contact us at the address below.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. When we do, we'll revise the date below. Material changes will be communicated where appropriate.",
    ],
  },
];

export default function Privacy() {
  return (
    <div>
      <Navigation />

      <section className="w-11/12 lg:w-7/12 mx-auto mt-16 lg:mt-24">
        <h1 className="text-4xl lg:text-6xl font-bold bg-[url('/text-bg-v2.png')] bg-cover bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="mt-4 text-gray-500">Last updated: June 2026</p>
        <p className="mt-6 lg:text-lg text-gray-700 leading-relaxed">
          This policy explains what information Larnova collects, how we use it,
          and the choices you have. It applies to this website and the
          newsletter and contact features on it.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
                {heading}
              </h2>
              {body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-3 text-gray-600 lg:text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Contact us
            </h2>
            <p className="mt-3 text-gray-600 lg:text-lg leading-relaxed">
              Questions about this policy or your data? Reach us at{" "}
              <Link
                href="mailto:contact@larnova.co?subject=Privacy%20enquiry"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                contact@larnova.co
              </Link>{" "}
              or through our{" "}
              <Link
                href="/contact"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="mt-20" />
      <Footer />
    </div>
  );
}
