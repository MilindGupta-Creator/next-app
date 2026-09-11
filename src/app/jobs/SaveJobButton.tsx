"use client";

import { useState } from "react";

export default function SaveJobButton() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      className="bg-blue-500 text-white py-2 px-4 rounded"
      onClick={() => setIsSaved(previous => !previous)}
    >
      {isSaved ? "Unsave Job" : "Save Job"}
    </button>
  );
}