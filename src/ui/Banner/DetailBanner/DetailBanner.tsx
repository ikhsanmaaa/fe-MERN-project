"use client";
import { Tab, Tabs } from "@heroui/react";
import IconTab from "./ImageTab/ImageTab";
import InfoTab from "./InfoTab/InfoTab";

import useDetailBanner from "./useDetailBanner";
import InfoTabSkeleton from "@/ui/SkeletonLoading/InfoTabSkeleton";
import CoverTabSkeleton from "@/ui/SkeletonLoading/CoverTabSkeleton";

const DetailBanner = () => {
  const {
    dataBanner,
    isLoading,
    isSuccessMutateUpdateBanner,
    handleUploadBanner,
    handleUploadBannerInfo,
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
            onUpdate={handleUploadBannerInfo}
            isPendingUpdate={isPendingMutateUpdateBanner}
            isSuccessUpdate={isSuccessMutateUpdateBanner}
          />
        )}
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
