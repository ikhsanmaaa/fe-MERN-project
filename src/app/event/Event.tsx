"use client";
import { IEvent } from "@/types/Event";
import useEvent from "./useEvent";
import CardEvent from "@/ui/LandingPage/Home/CardEvent/CardEvent";
import { Skeleton } from "@heroui/react";
import { useEffect } from "react";
import EventFooter from "@/ui/EventFooter/EventFooter";

const Event = () => {
  const { dataEvent, isLoadingEvent, isRefetchingEvent, refetchEvent } =
    useEvent();

  return (
    <div className="flex w-full  flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <div className="w-full lg:w-80">Filter</div>
      <div className="min-h-[70vh] w-fit flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoadingEvent && !isRefetchingEvent
            ? dataEvent?.data?.map((event: IEvent) => (
                <CardEvent event={event} key={`card-event-${event._id}`} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
        </div>

        {!isLoadingEvent && dataEvent?.data?.length > 0 && (
          <EventFooter
            total={dataEvent?.pagination.total}
            totalPages={dataEvent?.pagination?.totalPages}
          />
        )}
      </div>
    </div>
  );
};
export default Event;
