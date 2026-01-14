"use client";

import categoryServices from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface SetURLParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetCategoriesParams {
  page: number;
  limit: number;
  search?: string;
}

const useCategory = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const currentLimit = Number(searchParams.get("limit") ?? 8);
  const currentSearch = searchParams.get("search") ?? "";

  const setURL = ({ page, limit, search }: SetURLParams) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page !== undefined) params.set("page", String(page));
    if (limit !== undefined) params.set("limit", String(limit));
    if (search !== undefined) params.set("search", search);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const getCategories = async ({
    page,
    limit,
    search,
  }: GetCategoriesParams) => {
    let params = `limit=${limit}&page=${page}`;

    if (search) {
      params += `&search=${search}`;
    }

    const res = await categoryServices.getCategories(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["Category", currentPage, currentLimit, currentSearch],
    queryFn: () =>
      getCategories({
        page: currentPage,
        limit: currentLimit,
        search: currentSearch,
      }),
  });

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", selectedLimit);
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSearch = e.target.value;
    params.set("page", "1");
    params.set("search", currentSearch);

    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("search", "");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    setURL,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    currentPage,
    currentLimit,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    selectedId,
    setSelectedId,
  };
};

export default useCategory;
