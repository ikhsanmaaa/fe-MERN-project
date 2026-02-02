import ticketsServices from "@/services/tickets.services";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useDeleteTicketsModal = () => {
  const deleteTickets = async (id: string) => {
    const res = await ticketsServices.deleteTickets(id);
    return res;
  };

  const {
    mutate: mutateDeleteTickets,
    isPending: isPendingMutateDeleteTickets,
    isSuccess: isSuccessMutateDeleteTickets,
  } = useMutation({
    mutationFn: deleteTickets,
    onSuccess: () => {
      addToast({
        title: "succes",
        description: "Delete Tickets success!",
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
    mutateDeleteTickets,
    isPendingMutateDeleteTickets,
    isSuccessMutateDeleteTickets,
  };
};

export default useDeleteTicketsModal;
