import Counter from './Counter';

// No 'use client' here → this is a SERVER Component (the default).
export default function Home() {
  // This log appears in your TERMINAL (where npm run dev runs) — NOT the browser.
  console.log('🖥️  page.tsx rendered on the SERVER');

  // Computed on the server, once, at render time. It will NOT change when you tap the counter.
  const renderedAt = new Date().toLocaleTimeString();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Server + Client boundary</h1>
        <p className="mt-2 text-zinc-500">
          This heading is a <strong>Server Component</strong>, rendered on the server at{' '}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{renderedAt}</code>.
        </p>
      </div>

      {/* Counter is a Client Component island inside a Server Component page */}
      <Counter />
    </main>
  );
}
