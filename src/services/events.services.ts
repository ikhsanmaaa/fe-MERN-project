import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  addEvents: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
};

export default eventServices;
