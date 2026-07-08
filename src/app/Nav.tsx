'use client'; // ← needed because usePathname() is a hook, and hooks only run in the browser.

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  // usePathname() gives the current URL path ('/', '/about', ...) and re-runs on every
  // client-side navigation, so the highlight updates instantly without a page reload.
  const pathname = usePathname();

  // Small helper: is THIS link the page we're currently on?
  const linkClass = (href: string) =>
    `rounded px-3 py-1.5 text-sm font-medium transition-colors ${
      pathname === href
        ? 'bg-indigo-600 text-white' // active page
        : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800' // inactive
    }`;

  return (
    <nav className="flex items-center gap-2 border-b border-zinc-200 px-6 py-3 dark:border-zinc-800">
      {/* <Link> = client-side transition. No full reload; the browser tab never shows a spinner. */}
      <Link href="/" className={linkClass('/')}>
        Home
      </Link>
      <Link href="/about" className={linkClass('/about')}>
        About
      </Link>

      {/* Pushed to the right, a deliberately WRONG way to link, for contrast. */}
      <a
        href="/about"
        className="ml-auto rounded px-3 py-1.5 text-sm text-zinc-400 underline decoration-dotted"
      >
        About (plain &lt;a&gt; — full reload)
      </a>
    </nav>
  );
}
