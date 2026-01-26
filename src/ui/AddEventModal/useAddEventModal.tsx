"use client";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.services";
import eventServices from "@/services/events.services";
import { IEventCreateForm, IEventCreatePayload } from "@/types/Event";

import { toDateStandard } from "@/utils/date";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DateValue,
  getLocalTimeZone,
  now,
  ZonedDateTime,
} from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  description: yup.string().required("Please input description"),

  startDate: yup.mixed<ZonedDateTime>().required("Please select start date"),

  endDate: yup.mixed<ZonedDateTime>().required("Please select end date"),

  isOnline: yup
    .mixed<"true" | "false">()
    .oneOf(["true", "false"])
    .required("Please select status"),

  isFeatured: yup
    .mixed<"true" | "false">()
    .oneOf(["true", "false"])
    .required("Please select featured"),

  region: yup.string().required("Please select region"),

  banner: yup.mixed<FileList | string>().required("Please input banner"),

  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
});

const useAddEventModal = () => {
  const { handleDeleteFile, handleUploadFile } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<IEventCreateForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: now(getLocalTimeZone()),
      endDate: now(getLocalTimeZone()),
    },
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
          setValue("banner", fileUrl, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      },
    );
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryServices.getCategories(),
  });

  const addEvent = async (payload: IEventCreatePayload) => {
    const res = await eventServices.addEvent(payload);
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

  const handleAddEvent = (data: IEventCreateForm) => {
    const payload: IEventCreatePayload = {
      name: data.name,
      slug: data.slug,
      category: data.category,
      description: data.description,

      isFeatured: data.isFeatured === "true",
      isOnline: data.isOnline === "true",

      startDate: toDateStandard(data.startDate)!,
      endDate: toDateStandard(data.endDate, true)!,

      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },

      banner: data.banner instanceof FileList ? data.banner[0] : data.banner,
    };

    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleDeleteBanner,
    handleUploadBanner,
    handleOnClose,

    dataCategory,
  };
};

export default useAddEventModal;
