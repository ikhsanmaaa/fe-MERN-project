"use client";

import { useParams } from "next/navigation";
import { IBannersUpdatePayload } from "@/types/Banner";
import bannerServices from "@/services/banner.services";

const useUpdateBanner = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const updateInfoBanner = async (payload: IBannersUpdatePayload) => {
    if (!id) {
      throw new Error("Banner ID not found");
    }

    const { data } = await bannerServices.updateBanner(id, payload);
    return data.data;
  };

  return {
    updateInfoBanner,
  };
};

export default useUpdateBanner;
