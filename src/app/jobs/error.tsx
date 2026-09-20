"use client";

export default function JobsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div role="alert">
      <h2>Couldn’t load jobs</h2>
      <p>Please try again.</p>

      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}