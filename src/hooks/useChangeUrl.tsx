"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { DELAY } from "@/constants/list.constants";

const useChangeUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentPage = Number(searchParams.get("page") ?? 1);
  const currentLimit = Number(searchParams.get("limit") ?? 8);
  const currentSearch = searchParams.get("search") ?? "";

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");

      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, DELAY);
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.delete("search");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", e.target.value);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    currentPage,
    currentLimit,
    currentSearch,

    handleSearch,
    handleClearSearch,
    handleChangePage,
    handleChangeLimit,
  };
};

export default useChangeUrl;
