import { Suspense } from "react";
import JobsContent from "./JobsContent";

export default function JobsPage() {
  return (
    <div>
      <h1>Job Listings</h1>
      <p>Explore the latest opportunities.</p>

      <Suspense fallback={<p role="status">Loading job list...</p>}>
        <JobsContent />
      </Suspense>
    </div>
  );
}