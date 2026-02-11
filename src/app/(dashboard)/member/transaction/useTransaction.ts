"use client";

import useChangeUrl from "@/hooks/useChangeUrl";
import OrderServices from "@/services/order.services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useTransaction = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getOrderHistory = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

    const res = await OrderServices.orderHistory(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["Order-history", currentLimit, currentPage, currentSearch],
    queryFn: getOrderHistory,
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
