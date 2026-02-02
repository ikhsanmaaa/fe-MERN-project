"use client";
import { useParams } from "next/navigation";
import ticketsServices from "@/services/tickets.services";
import { ITicketsForm, ITicketsPayload, ITicketsUpdate } from "@/types/Ticket";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  price: yup.string().required("Please input price of ticket"),
  name: yup.string().required("Please input name of ticket"),
  description: yup.string().required("Please input description of ticket"),
  quantity: yup.string().required("Please input name of ticket"),
});

const useAddTicketModal = () => {
  const params = useParams<{ id: string }>();
  const eventId = params?.id;

  const {
    control: controlFormTicket,
    handleSubmit: handleSubmitFormTicket,
    formState: { errors: errorsTicketForm },
    reset,
  } = useForm<ITicketsUpdate>({
    resolver: yupResolver(schema),
  });

  const addTicket = async (payload: ITicketsPayload) => {
    const res = await ticketsServices.addTickets(payload);
    return res;
  };

  const {
    mutate: mutateAddTickets,
    isPending: isPendingMutateAddTickets,
    isSuccess: isSuccessMutateAddTickets,
  } = useMutation({
    mutationFn: addTicket,
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
        description: "Success add Ticket",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      reset();
    },
  });

  const handleAddTickets = (data: ITicketsUpdate) => {
    if (!eventId) return;

    const payload: ITicketsPayload = {
      events: eventId,
      price: Number(data.price),
      name: data.name,
      description: data.description,
      quantity: Number(data.quantity),
    };

    mutateAddTickets(payload);
  };

  return {
    controlFormTicket,
    errorsTicketForm,
    reset,
    handleSubmitFormTicket,
    handleAddTickets,
    isPendingMutateAddTickets,
    isSuccessMutateAddTickets,
  };
};

export default useAddTicketModal;
