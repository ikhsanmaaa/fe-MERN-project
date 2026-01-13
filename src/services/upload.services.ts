import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IfileURL } from "@/types/File";

const formdataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const UploadServices = {
  uploadFile: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/upload-single`, payload, formdataHeader),
  deleteFile: (payload: IfileURL) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default UploadServices;
