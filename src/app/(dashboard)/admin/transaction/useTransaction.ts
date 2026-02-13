"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import OrderServices from "@/services/order.services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useTransaction = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getAdminTransaction = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

    const res = await OrderServices.getOrders(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["AdminTransaction", currentLimit, currentPage, currentSearch],
    queryFn: getAdminTransaction,
  });

  return {
    dataTransactions,
    refetchTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,

    selectedId,
    setSelectedId,
  };
};

export default useTransaction;
