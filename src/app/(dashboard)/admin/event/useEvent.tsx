"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/events.services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useEvent = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    currentPage,
    currentLimit,
    currentSearch,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
  } = useChangeUrl();

  const getEvent = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&isPublish=true`;

    if (currentIsFeatured !== null) {
      params += `&isFeatured=${currentIsFeatured}`;
    }
    if (currentIsOnline !== null) {
      params += `&isOnline=${currentIsOnline}`;
    }
    if (currentCategory !== null) {
      params += `&category=${currentCategory}`;
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
    queryKey: [
      "Event",
      currentPage,
      currentLimit,
      currentSearch,
      currentCategory,
      currentIsFeatured,
      currentIsOnline,
    ],
    queryFn: getEvent,
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
