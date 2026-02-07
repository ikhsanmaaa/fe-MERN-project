"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/events.services";
import { useQuery } from "@tanstack/react-query";

const useEvent = () => {
  const {
    currentPage,
    currentLimit,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
  } = useChangeUrl();

  const getEvent = async () => {
    const params = new URLSearchParams();

    params.set("limit", String(currentLimit));
    params.set("page", String(currentPage));
    params.set("isPublish", "true");

    if (currentCategory) {
      params.set("category", currentCategory);
    }

    if (currentIsFeatured) {
      params.set("isFeatured", currentIsFeatured);
    }

    if (currentIsOnline) {
      params.set("isOnline", currentIsOnline);
    }

    const res = await eventServices.getEvents(params.toString());
    return res.data;
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
      currentCategory,
      currentIsFeatured,
      currentIsOnline,
    ],
    queryFn: getEvent,
    enabled: true,
  });

  return {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
  };
};

export default useEvent;
