import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const regionServices = {
  getRegion: () => instance.get(`${endpoint.REGION}?`),
};

export default regionServices;
