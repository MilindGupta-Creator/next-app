'use client'; // ← line 1. This file compiles for the BROWSER.

import { useState } from 'react';

export default function Counter() {
  // This log appears in your BROWSER console (F12) — because this runs in the browser.
  console.log('🌐 Counter rendered in the BROWSER');

  const [count, setCount] = useState(0); // hooks work here because we're a Client Component

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-6xl font-bold tabular-nums">{count}</span>
      <div className="flex gap-3">
        <button
          onClick={() => setCount(count + 1)}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Tap me
        </button>
        <button
          onClick={() => setCount(0)}
          className="rounded-lg border border-zinc-300 px-5 py-2 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          reset
        </button>
      </div>
    </div>
  );
}
