import Link from 'next/link';

// ─────────────────────────────────────────────────────────────
// DYNAMIC (SSR) — HTML made fresh, per request, on the server.
//
// I'm forcing it here with the route segment config so the demo is obvious:
export const dynamic = 'force-dynamic';
//
// But in real apps you almost never write that line — a page becomes dynamic
// AUTOMATICALLY the moment it touches request-specific data:
//   await cookies()      ← who is logged in
//   await headers()      ← user agent, geo
//   await searchParams   ← ?q=shoes
//   await connection()   ← "I really do need a request"
// Build output symbol: ƒ (Dynamic — server-rendered on demand)
// ─────────────────────────────────────────────────────────────

export default function DynamicPage() {
  // Runs on the SERVER, on every single request. Node.js, not the browser.
  const madeAt = new Date().toLocaleTimeString();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <Link href="/rendering" className="text-sm text-indigo-500 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Dynamic (SSR)</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        🧁 Made to order, on the server, every time you ask.
      </p>
      <p className="mt-6 rounded-lg bg-zinc-100 p-4 text-lg dark:bg-zinc-800">
        Made at: <strong className="tabular-nums">{madeAt}</strong>
      </p>
      <p className="mt-3 text-sm text-zinc-500">Refresh → new time, every single time.</p>
    </main>
  );
}
