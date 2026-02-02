"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import bannerServices from "@/services/banner.services";
import { GetParams } from "@/types/getParams";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useBanner = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getBanner = async ({ page, limit, search }: GetParams) => {
    let params = `limit=${limit}&page=${page}`;

    if (search) {
      params += `&search=${search}`;
    }

    const res = await bannerServices.getBanner(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataBanner,
    isLoading: isLoadingBanner,
    isRefetching: isRefetchingBanner,
    refetch: refetchBanner,
  } = useQuery({
    queryKey: ["Banner", currentPage, currentLimit, currentSearch],
    queryFn: () =>
      getBanner({
        page: currentPage,
        limit: currentLimit,
        search: currentSearch,
      }),
  });

  return {
    dataBanner,

    isLoadingBanner,
    isRefetchingBanner,

    refetchBanner,

    selectedId,
    setSelectedId,
  };
};

export default useBanner;
