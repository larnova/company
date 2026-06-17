import { getJobs, saveJobs, type Job } from "@/lib/store";
import { getAdminEmail } from "@/lib/auth";

export const dynamic = "force-dynamic";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function GET() {
  return Response.json({ jobs: await getJobs() });
}

export async function POST(request: Request) {
  if (!(await getAdminEmail()))
    return Response.json({ ok: false, error: "Not authorized." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const title = str(body.title);
  const description = str(body.description);
  if (!title) return Response.json({ ok: false, error: "Title is required." }, { status: 400 });
  if (!description)
    return Response.json({ ok: false, error: "Description is required." }, { status: 400 });

  const job: Job = {
    id: crypto.randomUUID(),
    title,
    team: str(body.team) || "General",
    location: str(body.location) || "Remote",
    type: str(body.type) || "Full-time",
    description,
    applyUrl: str(body.applyUrl) || "mailto:careers@larnova.co",
    createdAt: new Date().toISOString(),
  };

  const jobs = await getJobs();
  jobs.unshift(job);
  await saveJobs(jobs);
  return Response.json({ ok: true, job });
}

export async function DELETE(request: Request) {
  if (!(await getAdminEmail()))
    return Response.json({ ok: false, error: "Not authorized." }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id") || "";
  if (!id) return Response.json({ ok: false, error: "Missing id." }, { status: 400 });

  const jobs = await getJobs();
  await saveJobs(jobs.filter((j) => j.id !== id));
  return Response.json({ ok: true });
}
