"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder="Search jobs..."
      defaultValue={searchParams.get("query") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}