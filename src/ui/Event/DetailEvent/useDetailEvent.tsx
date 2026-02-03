"use client";

import EventServices from "@/services/events.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  IEventBannerForm,
  IEventUpdateInfoForm,
  IEventUpdateInfoPayload,
} from "@/types/Event";
import useUpdateEvent from "./useUpdateEvent";
import { addToast } from "@heroui/react";
import { toDateStandard } from "@/utils/date";
import regionServices from "@/services/region.services";

const useDetailEvent = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { updateEvent, updateEventBanner } = useUpdateEvent();

  const getEventById = async (id: string) => {
    const { data } = await EventServices.getEventById(id);
    return data.data;
  };

  const {
    data: dataEvent,
    isLoading,
    error,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["Event", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: updateEvent,
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
      refetchEvent();
      addToast({
        title: "success",
        description: "Success Update Event!",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const {
    mutate: mutateUpdateEventbanner,
    isPending: isPendingMutateUpdateEventBanner,
    isSuccess: isSuccessMutateUpdateEventBanner,
  } = useMutation({
    mutationFn: updateEventBanner,
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
      refetchEvent();
      addToast({
        title: "success",
        description: "Success Update Cover!",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const handleUploadEvent = (data: IEventUpdateInfoForm) => {
    const payload: IEventUpdateInfoPayload = {
      name: data.name,
      slug: data.slug,
      category: data.category,
      description: data.description,

      isFeatured: data.isFeatured === "true",
      isOnline: data.isOnline === "true",

      startDate: toDateStandard(data.startDate)!,
      endDate: toDateStandard(data.endDate, true)!,

      location: {
        address: data.address,
        region: Number(data.region),
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };

    mutateUpdateEvent(payload);
  };

  const handleUploadEventBanner = (data: IEventBannerForm) => {
    const file = data.banner?.[0];
    if (!file) return;

    mutateUpdateEventbanner({
      banner: file,
    });
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () => regionServices.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });
  return {
    dataEvent,
    isLoading,
    error,
    handleUploadEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    handleUploadEventBanner,
    isPendingMutateUpdateEventBanner,
    isSuccessMutateUpdateEventBanner,
    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailEvent;
