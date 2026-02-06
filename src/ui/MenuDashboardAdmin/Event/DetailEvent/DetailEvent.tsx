"use client";
import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab/InfoTab";
import useDetailEvent from "./useDetailEvent";
import CoverTab from "./CoverTab/CoverTab";
import TicketTab from "./TicketTab/TicketTab";
import CoverTabSkeleton from "@/ui/SkeletonLoading/CoverTabSkeleton";
import InfoTabSkeleton from "@/ui/SkeletonLoading/InfoTabSkeleton";

const DetailEvent = () => {
  const {
    dataEvent,
    isLoading,
    isSuccessMutateUpdateEvent,
    handleUploadEvent,
    isPendingMutateUpdateEvent,
    handleUploadEventBanner,
    isPendingMutateUpdateEventBanner,
    isSuccessMutateUpdateEventBanner,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailEvent();

  return (
    <Tabs aria-label="Options">
      <Tab key="Cover" title="Cover">
        {isLoading ? (
          <CoverTabSkeleton />
        ) : (
          <CoverTab
            currentCover={dataEvent.banner}
            onUpdateCover={handleUploadEventBanner}
            isPendingUpdate={isPendingMutateUpdateEventBanner}
            isSuccessUpdate={isSuccessMutateUpdateEventBanner}
          />
        )}
      </Tab>

      <Tab key="Info" title="Info">
        {isLoading ? (
          <InfoTabSkeleton />
        ) : (
          <InfoTab
            dataDefaultRegion={dataDefaultRegion?.data?.data?.[0]?.name}
            isPendingDefaultRegion={isPendingDefaultRegion}
            dataEvent={dataEvent}
            onUpdate={handleUploadEvent}
            isPendingUpdate={isPendingMutateUpdateEvent}
            isSuccessUpdate={isSuccessMutateUpdateEvent}
          />
        )}
      </Tab>
      <Tab key="Ticket" title="Ticket">
        <TicketTab />
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
