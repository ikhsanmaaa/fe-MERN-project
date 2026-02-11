"use client";

import OrderServices from "@/services/order.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const usePayment = () => {
  const searchParams = useSearchParams();

  const queryClient = useQueryClient();

  const orderId = searchParams.get("order_id");

  const transactionStatus = searchParams.get("transaction_status");

  const mapStatus = (transactionStatus: string) => {
    switch (transactionStatus) {
      case "settlement":
      case "capture":
        return "completed";
      case "pending":
        return "pending";
      case "deny":
      case "cancel":
      case "expire":
        return "cancelled";

      default:
        return transactionStatus;
    }
  };

  const updateOrderStatus = async ({
    orderId,
    transactionStatus,
  }: {
    orderId: string;
    transactionStatus: string;
  }) => {
    const res = await OrderServices.updateStatusTransaction(
      orderId,
      mapStatus(transactionStatus),
    );
    return res;
  };

  const { mutate: mutateUpdateOrderStatus } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Order-history"] });
    },
  });

  return {
    mutateUpdateOrderStatus,

    orderId,
    transactionStatus,
  };
};
export default usePayment;
