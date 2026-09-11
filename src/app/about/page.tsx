// src/app/about/page.tsx  →  serves the URL /about

import Link from "next/link";

// No 'use client' → this is a Server Component (the default).
export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="max-w-md text-center text-zinc-500">
        This page exists purely because the file is named{' '}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">page.tsx</code>{' '}
        inside the <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">about/</code> folder.
        The folder name became the URL.
      </p>

      <Link href="/jobs">Jobs</Link>
    </main>
  );
}
