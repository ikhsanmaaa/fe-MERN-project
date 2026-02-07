"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { DELAY } from "@/constants/list.constants";

const useChangeUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPage = Number(searchParams.get("page") ?? 1);
  const currentLimit = Number(searchParams.get("limit") ?? 8);
  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("category") ?? null;
  const currentIsOnline = searchParams.get("isOnline") ?? null;
  const currentIsFeatured = searchParams.get("isFeatured") ?? null;

  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.trim()) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      updateQuery({ search: value });
    }, DELAY);
  };

  const handleCategoryChange = (category: string | null) => {
    updateQuery({ category });
  };

  const handleIsOnlineChange = (isOnline: string | null) => {
    updateQuery({ isOnline });
  };

  const handleIsFeaturedChange = (isFeatured: string | null) => {
    updateQuery({ isFeatured });
  };

  const handleClearSearch = () => {
    updateQuery({
      search: null,
      category: null,
      isOnline: null,
      isFeatured: null,
    });
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
    timeoutRef,
    updateQuery,

    currentPage,
    currentLimit,
    currentSearch,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,

    handleSearch,
    handleCategoryChange,
    handleIsOnlineChange,
    handleIsFeaturedChange,

    handleClearSearch,
    handleChangePage,
    handleChangeLimit,
  };
};

export default useChangeUrl;
