"use client";

import authServices from "@/services/auth.services";
import { IProfileForm, IProfilePassword } from "@/types/Auth";

const useUpdateProfile = () => {
  const updateProfile = async (payload: IProfileForm) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const updatePassword = async (payload: IProfilePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data.data;
  };
  return {
    updateProfile,
    updatePassword,
  };
};

export default useUpdateProfile;
