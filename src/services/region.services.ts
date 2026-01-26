import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const regionServices = {
  getRegion: () => instance.get(`${endpoint.REGION}?`),
  getRegencyById: (id: string) =>
    instance.get(`${endpoint.REGION}/${id}/regency`),
};

export default regionServices;
