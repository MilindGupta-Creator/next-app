import Link from "next/link";
import { notFound } from "next/navigation";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ApiJob = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
};

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { id } = await params;

  const res = await fetch(`https://api.vercel.app/blog/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch job details");
  }

  const job: ApiJob = await res.json();

  return (
    <main>
      <Link href="/jobs" className="text-blue-500 hover:underline">
        ← Back to jobs
      </Link>

      <h1>{job.title}</h1>
      <p>Author: {job.author}</p>
      <p>Category: {job.category}</p>
      <p>Date: {job.date}</p>
      <p>{job.content}</p>
      <p>ID: {job.id}</p>
    </main>
  );
}