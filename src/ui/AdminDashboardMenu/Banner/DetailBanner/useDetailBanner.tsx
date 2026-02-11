"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { addToast } from "@heroui/react";
import {
  IBannersUpdateInfo,
  IBannersUpdatePayload,
  IBannerUpdateIcon,
  IBannerUpdateIconPayload,
} from "@/types/Banner";
import useUpdateBanner from "./useUpdateBanner";
import bannerServices from "@/services/banner.services";

const useDetailBanner = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { updateInfoBanner } = useUpdateBanner();

  const getBannerById = async (id: string) => {
    const { data } = await bannerServices.getBannerById(id);
    return data.data;
  };

  const {
    data: dataBanner,
    isLoading,
    error,
    refetch: refetchBanner,
  } = useQuery({
    queryKey: ["Banner", id],
    queryFn: () => getBannerById(id),
    enabled: !!id,
  });

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingMutateUpdateBanner,
    isSuccess: isSuccessMutateUpdateBanner,
  } = useMutation({
    mutationFn: updateInfoBanner,
    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      refetchBanner();
      addToast({
        title: "success",
        description: "Success Update Banner!",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const handleUploadBannerInfo = (data: IBannersUpdateInfo) => {
    const payload: IBannersUpdatePayload = {
      title: data.title,
      isShow: data.isShow === "true",
    };
    mutateUpdateBanner(payload);
  };

  const handleUploadBanner = (data: IBannerUpdateIcon) => {
    mutateUpdateBanner(data);
  };

  return {
    dataBanner,
    isLoading,
    error,
    handleUploadBannerInfo,
    handleUploadBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  };
};

export default useDetailBanner;
