"use client";
import { useParams } from "next/navigation";
import ticketsServices from "@/services/tickets.services";
import {
  ITicketsForm,
  ITicketsPayload,
  ITicketsUpdate,
  ITicketsUpdatePayload,
} from "@/types/Ticket";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateTicket = yup.object({
  price: yup.string().required("Please input price of ticket"),
  name: yup.string().required("Please input name of ticket"),
  description: yup.string().required("Please input description of ticket"),
  quantity: yup.string().required("Please input name of ticket"),
});

const useUpdateTicketModal = (id: string) => {
  const {
    control: controlUpdateTicket,
    handleSubmit: handleSubmitUpdateTicket,
    formState: { errors: errorsTicketUpdate },
    reset,
    setValue: setValueUpdateTickets,
  } = useForm<ITicketsUpdate>({
    resolver: yupResolver(schemaUpdateTicket),
  });

  const updateTicket = async (payload: ITicketsUpdatePayload) => {
    const res = await ticketsServices.updateTickets(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateTickets,
    isPending: isPendingMutateUpdateTickets,
    isSuccess: isSuccessMutateUpdateTickets,
  } = useMutation({
    mutationFn: updateTicket,
    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      addToast({
        title: "success",
        description: "Success update Ticket",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      reset();
    },
  });

  const handleUpdateTickets = (data: ITicketsUpdate) => {
    if (!id) return;

    const payload: ITicketsUpdatePayload = {
      price: Number(data.price),
      name: data.name,
      description: data.description,
      quantity: Number(data.quantity),
    };

    mutateUpdateTickets(payload);
  };

  return {
    controlUpdateTicket,
    errorsTicketUpdate,
    reset,
    handleSubmitUpdateTicket,
    handleUpdateTickets,
    isPendingMutateUpdateTickets,
    isSuccessMutateUpdateTickets,
    setValueUpdateTickets,
  };
};

export default useUpdateTicketModal;
