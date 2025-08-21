"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";



export const useKinoFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filters = useMemo(
    () => ({
      sortBy: searchParams.get("sortBy") || "",
      year: searchParams.get("year") || "",
      genres: searchParams.get("genres")
        ? searchParams.get("genres")!.split(",").map(Number)
        : [],
    }),
    [searchParams]
  );

  const setFilters = useCallback(
    (
      newFilters: Partial<{
        sortBy: string;
        year: string;
        genres: string[];
      }>
    ) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            currentParams.set(key, value.join(","));
          } else {
            currentParams.delete(key);
          }
        } else if (value) {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      });

      const query = currentParams.toString();
      const url = `${pathname}${query ? "?" + query : ""}`;

      router.replace(url, { scroll: false });
    },
    [router, searchParams, pathname]
  );

  return { filters, setFilters };
};
