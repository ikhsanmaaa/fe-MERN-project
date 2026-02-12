import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicketsPayload, ITicketsUpdatePayload } from "@/types/Ticket";

const ticketsServices = {
  addTickets: (payload: ITicketsPayload) =>
    instance.post(endpoint.TICKET, payload),
  getTicketsByEventId: (EventId: string) =>
    instance.get(`${endpoint.TICKET}/${EventId}/events`),
  getTicketsById: (TicketId: string) =>
    instance.get(`${endpoint.TICKET}/${TicketId}`),
  deleteTickets: (id: string) => instance.delete(`${endpoint.TICKET}/${id}`),
  updateTickets: (id: string, payload: ITicketsUpdatePayload) =>
    instance.put(`${endpoint.TICKET}/${id}`, payload),
};

export default ticketsServices;
