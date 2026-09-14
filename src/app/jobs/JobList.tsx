// Server Component. Its only job is looping — it does not own the data.
import JobCard from "./JobCard";
import type { Job } from "./types";

// Takes the whole array as a prop. Job[] means "an array of Job objects".
const JobList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <ul>
      {/* map turns each job object into one <JobCard />. */}
      {jobs.map(job => (
        // key lets React tell the items apart when the list changes.
        <JobCard key={job.id} job={job} />
      ))}
    </ul>
  );
};

export default JobList;
