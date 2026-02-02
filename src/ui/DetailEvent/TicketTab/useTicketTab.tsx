import ticketsServices from "@/services/tickets.services";
import { ITicketsForm, ITicketsPayload } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

const useTicketTab = () => {
  const [selectedDataTicket, setSelectedDataTicket] =
    useState<ITicketsForm | null>(null);

  const params = useParams<{ id: string }>();

  const id = params?.id;

  const getTicketsById = async (id: string) => {
    const { data } = await ticketsServices.getTicketsByEventId(id);
    return data.data;
  };

  const {
    data: dataTickets,
    isLoading: isLoadingTickets,
    isPending: isPendingTickets,
    refetch: refetchTickets,
    isRefetching: isRefetchingTickets,
  } = useQuery({
    queryKey: ["Tickets", id],
    queryFn: () => getTicketsById(id),
    enabled: !!id,
  });
  return {
    dataTickets,
    isLoadingTickets,
    isPendingTickets,
    refetchTickets,
    isRefetchingTickets,
    selectedDataTicket,
    setSelectedDataTicket,
  };
};

export default useTicketTab;
