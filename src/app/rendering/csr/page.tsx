import Link from 'next/link';
import ClientClock from './ClientClock';

// ─────────────────────────────────────────────────────────────
// CSR — the page itself is still STATIC (○ in the build output!).
// The timestamp isn't in the HTML at all. The server ships a hole ("—"),
// the browser downloads JS, hydrates, and only THEN fills it in.
// This is what your old React SPA did for the whole page.
// ─────────────────────────────────────────────────────────────

export default function CsrPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <Link href="/rendering" className="text-sm text-indigo-500 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Client-side (CSR)</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        🚚 The HTML arrives with a hole. The browser fills it after hydration.
      </p>
      <ClientClock />
      <p className="mt-3 text-sm text-zinc-500">
        Proof: View Source (Ctrl+U) — the time is NOT there. Only <code>—</code> is.
      </p>
    </main>
  );
}
