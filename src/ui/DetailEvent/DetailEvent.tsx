"use client";
import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab/InfoTab";
import useDetailEvent from "./useDetailEvent";
import CoverTab from "./CoverTab/CoverTab";
import InfoTabSkeleton from "../SkeletonLoading/InfoTabSkeleton";
import CoverTabSkeleton from "../SkeletonLoading/CoverTabSkeleton";

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
            dataEvent={dataEvent}
            onUpdate={handleUploadEvent}
            isPendingUpdate={isPendingMutateUpdateEvent}
            isSuccessUpdate={isSuccessMutateUpdateEvent}
          />
        )}
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
