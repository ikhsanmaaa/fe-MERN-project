"use client";
import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";
import useDetailCategory from "./useDetailCategory";
import CoverTabSkeleton from "@/ui/SkeletonLoading/CoverTabSkeleton";
import InfoTabSkeleton from "@/ui/SkeletonLoading/InfoTabSkeleton";

const DetailCategory = () => {
  const {
    dataCategory,
    isLoading,
    isSuccessMutateUpdateCategory,
    handleUploadCategory,
    isPendingMutateUpdateCategory,
  } = useDetailCategory();

  return (
    <Tabs aria-label="Options">
      <Tab key="Icon" title="Icon">
        {isLoading ? (
          <CoverTabSkeleton />
        ) : (
          <IconTab
            currentIcon={dataCategory.icon}
            onUpdate={handleUploadCategory}
            isPendingUpdate={isPendingMutateUpdateCategory}
            isSuccessUpdate={isSuccessMutateUpdateCategory}
          />
        )}
      </Tab>
      <Tab key="Info" title="Info">
        {isLoading ? (
          <InfoTabSkeleton />
        ) : (
          <InfoTab
            dataCategory={dataCategory}
            onUpdate={handleUploadCategory}
            isPendingUpdate={isPendingMutateUpdateCategory}
            isSuccessUpdate={isSuccessMutateUpdateCategory}
          />
        )}
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
