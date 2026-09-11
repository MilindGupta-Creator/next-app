'use client';

import { useEffect, useState } from 'react';

export default function ClientClock() {
  // Initial value = what the SERVER renders into the HTML. A hole.
  const [madeAt, setMadeAt] = useState('—');

  // useEffect NEVER runs on the server. This only fires after the JS
  // downloads and React hydrates in the browser.
  useEffect(() => {
    setMadeAt(new Date().toLocaleTimeString());
  }, []);

  return (
    <p className="mt-6 rounded-lg bg-zinc-100 p-4 text-lg dark:bg-zinc-800">
      Made at: <strong className="tabular-nums">{madeAt}</strong>
      <span className="ml-2 text-sm text-zinc-500">(filled in by the browser)</span>
    </p>
  );
}
