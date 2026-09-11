import Link from 'next/link';

// ─────────────────────────────────────────────────────────────
// ISR — static, but with an expiry date.
// Baked at build time like SSG, but after 10s the NEXT visitor triggers a re-bake
// in the background. That visitor still gets the stale page instantly
// (= stale-while-revalidate); the one after them gets the fresh one.
// Build output symbol: ○/● with a "Revalidate" column.
// ─────────────────────────────────────────────────────────────
export const revalidate = 10;

export default function IsrPage() {
  const bakedAt = new Date().toLocaleTimeString();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <Link href="/rendering" className="text-sm text-indigo-500 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">ISR (revalidate = 10)</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        🧁 Baked, then re-baked at most once every 10 seconds.
      </p>
      <p className="mt-6 rounded-lg bg-zinc-100 p-4 text-lg dark:bg-zinc-800">
        Made at: <strong className="tabular-nums">{bakedAt}</strong>
      </p>
      <p className="mt-3 text-sm text-zinc-500">
        Refresh fast → frozen. Wait 10s, refresh twice → it jumps.
      </p>
    </main>
  );
}
