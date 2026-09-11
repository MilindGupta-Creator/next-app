import Link from 'next/link';

// ─────────────────────────────────────────────────────────────
// STATIC (SSG) — the default in the App Router.
// No `revalidate`, no `dynamic`, no cookies()/headers()/searchParams.
// So Next bakes this ONCE during `next build` and serves the same file forever.
// Build output symbol: ○ (or ● if it came from generateStaticParams)
// ─────────────────────────────────────────────────────────────

export default function StaticPage() {
  // Runs at BUILD TIME only. This clock is frozen the moment you run `next build`.
  const bakedAt = new Date().toLocaleTimeString();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <Link href="/rendering" className="text-sm text-indigo-500 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Static (SSG)</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        🧁 Baked once at build time. Refresh 100 times — same number.
      </p>
      <p className="mt-6 rounded-lg bg-zinc-100 p-4 text-lg dark:bg-zinc-800">
        Made at: <strong className="tabular-nums">{bakedAt}</strong>
      </p>
    </main>
  );
}
