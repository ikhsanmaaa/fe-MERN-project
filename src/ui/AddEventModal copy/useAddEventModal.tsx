"use client";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.services";
import eventServices from "@/services/events.services";
import { IEvent } from "@/types/Event";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("please select category"),
  description: yup.string().required("please input description"),
  startDate: yup.mixed<DateValue>().required("please select start date"),
  endDate: yup.mixed<DateValue>().required("please select end date"),
  isPublished: yup.string().required("please select status"),
  isFeatured: yup.string().required("please select featured"),
  isOnline: yup.string().required("please select online or offline"),
  region: yup.string().required("please select region"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
});

const useAddEventModal = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(
      files,
      onChange,
      (fileUrl: string | string | undefined) => {
        if (fileUrl) {
          setValue("banner", fileUrl);
        }
      },
    );
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryServices.getCategories(),
  });

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvents(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
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
        description: "Success add Event",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      reset();
    },
  });

  const handleAddEvent = (data: IEvent) => mutateAddEvent(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    isPendingMutateUploadFile,

    preview,
    handleDeleteBanner,
    handleUploadBanner,
    isPendingMutateDeleteFile,
    handleOnClose,

    dataCategory,
  };
};

export default useAddEventModal;
