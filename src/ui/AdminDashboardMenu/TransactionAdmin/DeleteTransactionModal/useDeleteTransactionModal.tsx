import OrderServices from "@/services/order.services";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteTransactionModal = () => {
  const deleteTransaction = async (id: string) => {
    const res = await OrderServices.deleteOrder(id);
    return res;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingMutateDeleteTransaction,
    isSuccess: isSuccessMutateDeleteTransaction,
  } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      addToast({
        title: "succes",
        description: "Delete Transaction success!",
        color: "success",
      });
    },

    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
      });
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  };
};

export default useDeleteTransactionModal;
