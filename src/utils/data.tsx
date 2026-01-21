import categoryServices from "@/services/category.services";
import eventServices from "@/services/events.services";
import { GetParams } from "@/types/getParams";

const Data = () => {
  const getCategories = async ({ page, limit, search }: GetParams) => {
    let params = `limit=${limit}&page=${page}`;

    if (search) {
      params += `&search=${search}`;
    }

    const res = await categoryServices.getCategories(params);
    const { data } = res;

    return data;
  };

  const getRegion = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;

    return data;
  };

  return {
    getRegion,
    getCategories,
  };
};

export default Data;
