"use client";
import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";

import authServices from "@/services/auth.services";
import eventServices from "@/services/events.services";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { timeoutRef, updateQuery } = useChangeUrl();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const getEventsSearch = async (searchValue: string) => {
    const params = `search=${searchValue}&limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;

    const res = await eventServices.getEvents(params);

    return res.data.data;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: dataEventSearch,
    isLoading: isLoadingEventSearch,
    isRefetching: isRefetchingEventSearch,
  } = useQuery({
    queryKey: ["EventSearch", debouncedSearch],
    queryFn: ({ queryKey }) => {
      const [, searchValue] = queryKey;
      return getEventsSearch(searchValue);
    },
    enabled: debouncedSearch.trim().length > 0,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      updateQuery({ search: value });
    }, DELAY);
  };

  return {
    search,
    setSearch,

    handleSearch,

    dataProfile,

    dataEventSearch,
    isLoadingEventSearch,
    isRefetchingEventSearch,
  };
};

export default useLandingPageLayoutNavbar;
