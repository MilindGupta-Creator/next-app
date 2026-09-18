import JobList from "./JobList";
import type { Job } from "./types";

const JobsPage = async () => {
  const res = await fetch("https://api.vercel.app/blog");

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await res.json();

  console.log("JOBS PAGE RENDERED");
  console.log(data);

  const jobs: Job[] = data.map((job: any) => ({
    id: job.id,
    title: job.title,
    company: "Vercel", // hardcoded for now
    location: "Remote", // hardcoded for now
    description: job.description ?? "Not provided", // fallback if description is missing
  }));

  return (
    <div>
      <h1>Job Listings</h1>

      {/* we'll adapt data here */}
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobsPage;