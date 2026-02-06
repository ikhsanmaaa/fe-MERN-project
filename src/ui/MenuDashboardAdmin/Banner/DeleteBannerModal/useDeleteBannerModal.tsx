import bannerServices from "@/services/banner.services";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteBannerModal = () => {
  const deleteBanner = async (id: string) => {
    const res = await bannerServices.deleteBanner(id);
    return res;
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingMutateDeleteBanner,
    isSuccess: isSuccessMutateDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      addToast({
        title: "succes",
        description: "Delete Banner success!",
        color: "success",
      });
    },

    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
      });
    },
  });

  return {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  };
};

export default useDeleteBannerModal;
