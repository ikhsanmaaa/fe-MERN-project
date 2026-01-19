"use client";
import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,
    isLoading,
    isSuccessMutateUpdateCategory,
    handleUploadCategory,
    isPendingMutateUpdateCategory,
  } = useDetailCategory();
  if (isLoading || !dataCategory) {
    return <div>Loading...</div>;
  }
  return (
    <Tabs aria-label="Options">
      <Tab key="Icon" title="Icon">
        <IconTab
          currentIcon={dataCategory.icon}
          onUpdate={handleUploadCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="Info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUploadCategory}
          isPendingUpdate={isPendingMutateUpdateCategory}
          isSuccessUpdate={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
