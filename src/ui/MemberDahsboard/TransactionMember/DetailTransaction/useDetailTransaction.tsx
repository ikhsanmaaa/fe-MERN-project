"use client";

import eventServices from "@/services/events.services";
import OrderServices from "@/services/order.services";
import ticketsServices from "@/services/tickets.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useDetailTransaction = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const getOrderById = async (id: string) => {
    const { data } = await OrderServices.getOrderById(id);
    return data.data;
  };

  const { data: dataOrder } = useQuery({
    queryKey: ["Order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(`${dataOrder.events}`);
    return data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["EventById"],
    queryFn: getEventById,
    enabled: !!dataOrder?.events,
  });

  const getTicketById = async () => {
    const { data } = await ticketsServices.getTicketsById(
      `${dataOrder?.ticket}`,
    );
    return data.data;
  };

  const { data: dataTickets } = useQuery({
    queryKey: ["TicketsById"],
    queryFn: getTicketById,
    enabled: !!dataOrder?.ticket,
  });

  return {
    dataOrder,
    dataEvent,
    dataTickets,
  };
};

export default useDetailTransaction;
