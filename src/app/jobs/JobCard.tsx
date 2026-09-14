// Server Component (no "use client"), so none of this code is sent to the browser.
import type { Job } from "./types";

// Takes ONE job. The { job } part pulls the job prop out of the props object.
const JobCard = ({ job }: { job: Job }) => {
  return (
    <li className="border-b py-4">
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
    </li>
  );
};

export default JobCard;
