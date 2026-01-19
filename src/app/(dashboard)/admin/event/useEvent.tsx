"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/events.services";
import { GetParams } from "@/types/getParams";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useEvent = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getEvent = async ({ page, limit, search }: GetParams) => {
    let params = `limit=${limit}&page=${page}`;

    if (search) {
      params += `&search=${search}`;
    }

    const res = await eventServices.getEvents(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    isRefetching: isRefetchingEvent,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["Event", currentPage, currentLimit, currentSearch],
    queryFn: () =>
      getEvent({
        page: currentPage,
        limit: currentLimit,
        search: currentSearch,
      }),
  });

  return {
    dataEvent,

    isLoadingEvent,
    isRefetchingEvent,

    refetchEvent,

    selectedId,
    setSelectedId,
  };
};

export default useEvent;
