"use client";

import OrderServices from "@/services/order.services";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const usePayment = () => {
  const searchParams = useSearchParams();

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

  const updateOrderStatus = async () => {
    const res = await OrderServices.updateStatusTransaction(
      `${orderId}`,
      mapStatus(`${transactionStatus}`),
    );
    return res;
  };

  const { mutate: mutateUpdateOrderStatus } = useMutation({
    mutationFn: updateOrderStatus,
  });

  return {
    mutateUpdateOrderStatus,

    orderId,
    transactionStatus,
  };
};
export default usePayment;
