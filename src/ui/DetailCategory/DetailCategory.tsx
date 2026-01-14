"use client";
import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab/IconTab";
import InfoTab from "./InfoTab/InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const { dataCategory, isLoading } = useDetailCategory();
  if (isLoading || !dataCategory) {
    return <div>Loading...</div>;
  }
  return (
    <Tabs aria-label="Options">
      <Tab key="Icon" title="Icon">
        <IconTab currentIcon={dataCategory.icon} />
      </Tab>
      <Tab key="Info" title="Info">
        <InfoTab dataCategory={dataCategory} />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
