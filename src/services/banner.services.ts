import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IBannersPayload, IBannersUpdatePayload } from "@/types/Banner";

const bannerServices = {
  getBanner: (params?: string) => instance.get(`${endpoint.BANNER}?${params}`),
  getBannerById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
  addBanner: (payload: IBannersPayload) =>
    instance.post(endpoint.BANNER, payload),
  deleteBanner: (id: string) => instance.delete(`${endpoint.BANNER}/${id}`),
  updateBanner: (id: string, payload: IBannersUpdatePayload) =>
    instance.put(`${endpoint.BANNER}/${id}`, payload),
};

export default bannerServices;
