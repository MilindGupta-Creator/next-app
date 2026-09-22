import { Suspense } from "react";
import JobsContent from "./JobsContent";
import Search from "./Search";

type JobsPageProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};


export default async function JobsPage({ searchParams }: JobsPageProps) {

  const { query } = await searchParams;

  return (
    <div>
      <h1>Job Listings</h1>
      <p>Explore the latest opportunities.</p>

      <Search />

      <Suspense fallback={<p role="status">Loading job list...</p>}>
        <JobsContent query={query} />
      </Suspense>
    </div>
  );
}