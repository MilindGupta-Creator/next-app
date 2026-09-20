import JobList from "./JobList";
import type { Job } from "./types";

export default async function JobsContent() {

  const res = await fetch("https://api.vercel.app/blog");

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();

  const jobs: Job[] = data.map((job: any) => ({
    id: job.id,
    title: job.title,
    company: "Vercel",
    location: "Remote",
    description: job.content ?? "Not provided",
  }));

  return <JobList jobs={jobs} />;
}