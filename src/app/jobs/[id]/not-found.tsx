import Link from "next/link";

export default function JobNotFound() {
  return (
    <main>
      <h1>Job not found</h1>
      <p>The requested job does not exist.</p>
      <Link href="/jobs">Return to job listings</Link>
    </main>
  );
}