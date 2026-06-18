import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminEmail } from "@/lib/auth";
import { getJobs } from "@/lib/store";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Larnova",
  robots: { index: false, follow: false },
};

export default async function ManagePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; token?: string }>;
}) {
  const { error, token } = await searchParams;
  if (token) redirect(`/api/auth/verify?token=${encodeURIComponent(token)}`);

  const admin = await getAdminEmail();
  if (!admin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gray-50">
        <SignIn invalid={error === "invalid"} />
      </main>
    );
  }

  const jobs = await getJobs();
  return <Dashboard email={admin} initialJobs={jobs} />;
}
