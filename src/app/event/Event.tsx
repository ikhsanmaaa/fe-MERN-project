"use client";
import { IEvent } from "@/types/Event";
import useEvent from "./useEvent";
import CardEvent from "@/ui/LandingPage/Home/CardEvent/CardEvent";
import { Skeleton } from "@heroui/react";
import EventFooter from "@/ui/EventExplore/EventFooter/EventFooter";
import EventFilter from "@/ui/EventExplore/EventFilter/EventFilter";
import Image from "next/image";

const Event = () => {
  const { dataEvent, isLoadingEvent, isRefetchingEvent } = useEvent();

  return (
    <div className="flex w-full  flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <EventFilter />
      <div className="min-h-[70vh] w-full flex-1">
        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoadingEvent
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-[280px] w-full rounded-xl" />
              ))
            : dataEvent?.data?.map((event: IEvent) => (
                <CardEvent event={event} key={event._id} />
              ))}
        </div>

        {!isLoadingEvent && dataEvent?.data?.length > 0 && (
          <EventFooter totalPages={dataEvent?.pagination?.totalPages} />
        )}

        {dataEvent?.data?.length < 1 &&
          !isLoadingEvent &&
          !isRefetchingEvent && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Image
                src="/images/illustration/no-data.svg"
                alt="no-data"
                width={200}
                height={200}
              />
              <h2 className="text-center text-2xl font-bold text-danger">
                Event is empty!
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};
export default Event;
