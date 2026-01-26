"use client";

import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { DELAY } from "@/constants/list.constants";
import { useQuery } from "@tanstack/react-query";
import { IRegion } from "@/types/Region";
import eventServices from "@/services/events.services";

const [searchRegency, setSearchRegency] = useState("");

const debouncedSearchRegion = useDebounce(searchRegency, DELAY);

const { data: dataRegion = [], isFetching: isFetchingRegion } = useQuery<
  IRegion[]
>({
  queryKey: ["region", debouncedSearchRegion],
  queryFn: async () => {
    const res = await eventServices.searchLocationByRegency(
      debouncedSearchRegion,
    );
    return res.data.data;
  },
  enabled: debouncedSearchRegion.trim() !== "",
});
