// Server Component. Pages are Server Components by default — you never write "use server".
import JobList from "./JobList";
import type { Job } from "./types";

// The page owns the data. Later this line becomes a database or API call.
const jobs: Job[] = [
  { id: 1, title: "Software Engineer", company: "Tech Corp", location: "New York, NY", description: "Develop and maintain web applications." },
  { id: 2, title: "Product Manager", company: "Business Inc", location: "San Francisco, CA", description: "Lead product development and strategy." },
  { id: 3, title: "Data Scientist", company: "Analytics LLC", location: "Chicago, IL", description: "Analyze data to drive business insights." },
];

const JobsPage = () => {
  // Prints in the TERMINAL, never the browser. Proof this ran on the server.
  console.log("JOBS PAGE RENDERED");

  return (
    <div>
      <h1>Job Listings</h1>
      {/* Hand the array down. This is the "fetch high, render low" flow. */}
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobsPage;
