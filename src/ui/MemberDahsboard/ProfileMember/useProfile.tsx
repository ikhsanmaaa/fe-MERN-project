"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import useUpdateEvent from "./useUpdateProfile";
import { addToast } from "@heroui/react";
import authServices from "@/services/auth.services";
import { IProfileForm, IProfilePassword } from "@/types/Auth";

const useProfile = () => {
  const { updateProfile, updatePassword } = useUpdateEvent();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    refetch: refetchProfile,
    isLoading,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      refetchProfile();
      addToast({
        title: "success",
        description: "Success Update Profile!",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
  } = useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      refetchProfile();
      addToast({
        title: "success",
        description: "Success Update Password!",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const handleUploadProfile = (data: IProfileForm) => {
    mutateUpdateProfile(data);
  };

  const handleUploadPassword = (data: IProfilePassword) => {
    mutateUpdatePassword(data);
  };

  return {
    handleUploadPassword,
    handleUploadProfile,

    isPendingMutateUpdatePassword,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
    dataProfile,
    isLoading,
  };
};

export default useProfile;
