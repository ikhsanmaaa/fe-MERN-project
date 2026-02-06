"use client";

import { useParams } from "next/navigation";
import EventServices from "@/services/events.services";
import { IEventBannerForm, IEventUpdatePayload } from "@/types/Event";

const useUpdateEvent = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const updateEvent = async (payload: IEventUpdatePayload) => {
    if (!id) {
      throw new Error("Event ID not found");
    }

    const { data } = await EventServices.updateEvent(id, payload);
    return data.data;
  };

  const updateEventBanner = async (payload: IEventBannerForm) => {
    if (!id) {
      throw new Error("Event ID not found");
    }

    const { data } = await EventServices.updateEvent(id, payload);
    return data.data;
  };
  return {
    updateEvent,
    updateEventBanner,
  };
};

export default useUpdateEvent;
