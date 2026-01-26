import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IEvent,
  IEventCreatePayload,
  IEventUpdateBannerPayload,
  IEventUpdateInfoPayload,
} from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  getEventById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
  addEvent: (payload: IEventCreatePayload) =>
    instance.post(endpoint.EVENT, payload),
  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
  updateEvent: (id: string, payload: IEventUpdateInfoPayload) =>
    instance.put(`${endpoint.EVENT}/${id}`, payload),
  updateEventBanner: (id: string, payload: IEventUpdateBannerPayload) => {
    const formData = new FormData();
    formData.append("banner", payload.banner);

    return instance.put(`${endpoint.EVENT}/${id}`, formData);
  },
};

export default eventServices;
