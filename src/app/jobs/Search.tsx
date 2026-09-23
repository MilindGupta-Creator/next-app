"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [term, setTerm] = useState(searchParams.get("query") ?? "");

  useEffect(() => {

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 300)

    return () => clearTimeout(timer);

  }, [term])



  return (
    <input
      type="text"
      placeholder="Search jobs..."
      defaultValue={searchParams.get("query") ?? ""}
      onChange={(e) => setTerm(e.target.value)}
    />
  );
}