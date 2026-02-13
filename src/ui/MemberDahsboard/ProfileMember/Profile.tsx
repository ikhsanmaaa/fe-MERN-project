"use client";
import { Tab, Tabs } from "@heroui/react";
import CoverTabSkeleton from "@/ui/SkeletonLoading/CoverTabSkeleton";
import InfoTabSkeleton from "@/ui/SkeletonLoading/InfoTabSkeleton";
import useProfile from "./useProfile";
import PictureTab from "./PictureTab/PictureTab";
import InfoTab from "./InfoTab/InfoTab";
import SecurityTab from "./SecurityTab/SecurityTab";

const Profile = () => {
  const {
    handleUploadPassword,
    handleUploadProfile,
    isLoading,
    isSuccessMutateUpdateProfile,
    isPendingMutateUpdateProfile,

    dataProfile,
  } = useProfile();

  return (
    <Tabs aria-label="Options">
      <Tab key="Cover" title="Cover">
        {isLoading ? (
          <CoverTabSkeleton />
        ) : (
          <PictureTab
            currentPicture={dataProfile?.profilePicture}
            onUpdatePicture={handleUploadProfile}
            isPendingUpdate={isPendingMutateUpdateProfile}
            isSuccessUpdate={isSuccessMutateUpdateProfile}
          />
        )}
      </Tab>

      <Tab key="Info" title="Info">
        {isLoading ? (
          <InfoTabSkeleton />
        ) : (
          <InfoTab
            dataProfile={dataProfile}
            isPendingUpdate={isPendingMutateUpdateProfile}
            isSuccessUpdate={isSuccessMutateUpdateProfile}
            onUpdate={handleUploadProfile}
          />
        )}
      </Tab>

      <Tab key="Security" title="Security">
        {isLoading ? <InfoTabSkeleton /> : <SecurityTab />}
      </Tab>
    </Tabs>
  );
};

export default Profile;
