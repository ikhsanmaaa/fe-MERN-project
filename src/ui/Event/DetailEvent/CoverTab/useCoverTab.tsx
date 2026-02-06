"use client";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useMediaHandling from "@/hooks/useMediaHandling";
import { IEventBannerForm } from "@/types/Event";

const schemaUpdateCover = yup.object({
  banner: yup
    .mixed<FileList | string>()
    .required("Please input Cover of Event"),
});

const useCoverTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateCover,
    handleSubmit: handleSubmitUpdateCover,
    formState: { errors: errorsUpdateCover },
    reset: resetUpdateCover,
    getValues: getValuesUpdateCover,
    setValue: setValueUpdateCover,
    watch,
  } = useForm<IEventBannerForm>({
    resolver: yupResolver(schemaUpdateCover),
  });

  const previewBanner = watch("banner");
  const fileUrl = getValuesUpdateCover("banner");

  const handleDeleteCover = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleUploadCover = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(
      files,
      onChange,
      (fileUrl: string | string | undefined) => {
        if (fileUrl) {
          setValueUpdateCover("banner", fileUrl);
        }
      },
    );
  };

  return {
    handleDeleteCover,
    handleUploadCover,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    controlUpdateCover,
    handleSubmitUpdateCover,
    errorsUpdateCover,
    resetUpdateCover,

    previewBanner,
  };
};

export default useCoverTab;
