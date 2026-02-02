"use client";
import { Tab, Tabs } from "@heroui/react";
import IconTab from "./ImageTab/ImageTab";
import InfoTab from "./InfoTab/InfoTab";
import CoverTabSkeleton from "../SkeletonLoading/CoverTabSkeleton";
import InfoTabSkeleton from "../SkeletonLoading/InfoTabSkeleton";
import useDetailBanner from "./useDetailBanner";

const DetailBanner = () => {
  const {
    dataBanner,
    isLoading,
    isSuccessMutateUpdateBanner,
    handleUploadBanner,
    isPendingMutateUpdateBanner,
  } = useDetailBanner();

  return (
    <Tabs aria-label="Options">
      <Tab key="Icon" title="Icon">
        {isLoading ? (
          <CoverTabSkeleton />
        ) : (
          <IconTab
            currentImage={dataBanner.image}
            onUpdate={handleUploadBanner}
            isPendingUpdate={isPendingMutateUpdateBanner}
            isSuccessUpdate={isSuccessMutateUpdateBanner}
          />
        )}
      </Tab>
      <Tab key="Info" title="Info">
        {isLoading ? (
          <InfoTabSkeleton />
        ) : (
          <InfoTab
            dataBanner={dataBanner}
            onUpdate={handleUploadBanner}
            isPendingUpdate={isPendingMutateUpdateBanner}
            isSuccessUpdate={isSuccessMutateUpdateBanner}
          />
        )}
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
