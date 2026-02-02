"use client";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.services";
import categoryServices from "@/services/category.services";
import { IBannersForm, IBannersPayload } from "@/types/Banner";
import { ICategory } from "@/types/Category";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title of banner"),
  isShow: yup.string().required("Please select publish of banner"),
  image: yup.mixed<FileList | string>().required("Please input banner image"),
});

const useAddBannerModal = () => {
  const { handleUploadFile, handleDeleteFile } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<IBannersForm>({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(
      files,
      onChange,
      (fileUrl: string | string | undefined) => {
        if (fileUrl) {
          setValue("image", fileUrl);
        }
      },
    );
  };

  const addBanner = async (payload: IBannersPayload) => {
    const res = await bannerServices.addBanner(payload);
    return res;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingMutateAddBanner,
    isSuccess: isSuccessMutateAddBanner,
  } = useMutation({
    mutationFn: addBanner,
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
      addToast({
        title: "success",
        description: "Success add Banner",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      reset();
    },
  });

  const handleAddBanner = (data: IBannersPayload) => mutateAddBanner(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,
    handleUploadIcon,
    preview,
    handleDeleteIcon,
    handleOnClose,
  };
};

export default useAddBannerModal;
