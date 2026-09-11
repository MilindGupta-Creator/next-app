import Link from 'next/link';

// Day 5 hub. Four pages, ONE difference between them: WHEN the HTML gets made.
const demos = [
  {
    href: '/rendering/static',
    name: 'Static (SSG)',
    when: 'HTML made ONCE, at build time',
    expect: 'Timestamp NEVER changes, no matter how many times you refresh.',
  },
  {
    href: '/rendering/isr',
    name: 'ISR',
    when: 'HTML made at build time, then re-made every 10s (on demand)',
    expect: 'Timestamp freezes, then jumps after 10s.',
  },
  {
    href: '/rendering/dynamic',
    name: 'Dynamic (SSR)',
    when: 'HTML made FRESH on every single request',
    expect: 'Timestamp changes on every refresh.',
  },
  {
    href: '/rendering/csr',
    name: 'Client-side (CSR)',
    when: 'HTML has a hole; the BROWSER fills it after load',
    expect: 'Timestamp changes every refresh — but it is NOT in the HTML source.',
  },
];

export default function RenderingHub() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Day 5 — Rendering strategies</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        Same page, same timestamp, four different answers to one question:{' '}
        <strong>when is the HTML made?</strong>
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {demos.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="block rounded-lg border border-zinc-200 p-4 hover:border-indigo-500 dark:border-zinc-800"
            >
              <span className="font-medium">{d.name}</span>
              <span className="block text-sm text-indigo-500">{d.when}</span>
              <span className="mt-1 block text-sm text-zinc-500">{d.expect}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
