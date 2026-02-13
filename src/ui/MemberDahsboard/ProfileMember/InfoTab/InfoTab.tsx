import { IEventUpdateInfoForm } from "@/types/Event";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { IRegion } from "@/types/Region";
import { useDebounce } from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.constants";
import { useQuery } from "@tanstack/react-query";
import { IProfileForm, IProfilePayload } from "@/types/Auth";

interface PropTypes {
  dataProfile: IProfilePayload;
  onUpdate: (data: IProfileForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfoProfile,
    handleSubmitUpdateInfoProfile,
    errorsUpdateInfoProfile,
    setValueUpdateInfoProfile,
    resetUpdateInfoProfile,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfoProfile("username", `${dataProfile.username}`);
    setValueUpdateInfoProfile("email", `${dataProfile.email}`);
    setValueUpdateInfoProfile("role", `${dataProfile.role}`);
    setValueUpdateInfoProfile("fullName", `${dataProfile.fullName}`);
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfoProfile();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">User Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfoProfile(onUpdate)}
        >
          <Controller
            name="username"
            control={controlUpdateInfoProfile}
            render={({ field }) => (
              <Input
                {...field}
                disabled
                variant="bordered"
                label="Username"
                labelPlacement="outside"
                type="text"
                placeholder="Input your fullname"
                isInvalid={errorsUpdateInfoProfile.username !== undefined}
                errorMessage={errorsUpdateInfoProfile.username?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={controlUpdateInfoProfile}
            render={({ field }) => (
              <Input
                {...field}
                disabled
                variant="bordered"
                label="Email"
                labelPlacement="outside"
                type="email"
                isInvalid={errorsUpdateInfoProfile.email !== undefined}
                errorMessage={errorsUpdateInfoProfile.email?.message}
              />
            )}
          />
          <Controller
            name="role"
            control={controlUpdateInfoProfile}
            render={({ field }) => (
              <Input
                {...field}
                disabled
                variant="bordered"
                label="Role"
                labelPlacement="outside"
                type="text"
                isInvalid={errorsUpdateInfoProfile.role !== undefined}
                errorMessage={errorsUpdateInfoProfile.role?.message}
              />
            )}
          />
          <Controller
            name="fullName"
            control={controlUpdateInfoProfile}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                label="Fullname"
                labelPlacement="outside"
                type="text"
                isInvalid={errorsUpdateInfoProfile.fullName !== undefined}
                errorMessage={errorsUpdateInfoProfile.fullName?.message}
              />
            )}
          />

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataProfile?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default InfoTab;
