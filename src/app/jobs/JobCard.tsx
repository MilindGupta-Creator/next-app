// Server Component (no "use client"), so none of this code is sent to the browser.
import SaveButton from "./SaveButton";
import type { Job } from "./types";
import Link from "next/link";

// Takes ONE job. The { job } part pulls the job prop out of the props object.
const JobCard = ({ job }: { job: Job }) => {
  return (
    <li className="border-b py-4">
      <h2>
        <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
          {job.title}</Link>
        </h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
      <SaveButton jobId={job.id} />
    </li >
  );
};

export default JobCard;
