"use client";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useMediaHandling from "@/hooks/useMediaHandling";
import { IEventBannerForm } from "@/types/Event";

const schemaUpdateCover = yup.object({
  banner: yup.mixed<FileList>().required("Please input Cover of Event"),
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
    watch,
    setValue,
  } = useForm<IEventBannerForm>({
    resolver: yupResolver(schemaUpdateCover),
  });

  const [uploadedBannerUrl, setUploadedBannerUrl] = useState<string | null>(
    null,
  );

  const previewBanner = watch("banner");

  const handleDeleteCover = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (!uploadedBannerUrl) return;

    handleDeleteFile(uploadedBannerUrl, () => {
      onChange(undefined);
      setUploadedBannerUrl(null);
      resetUpdateCover();
    });
  };

  const handleUploadCover = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl?: string) => {
      if (fileUrl) {
        setUploadedBannerUrl(fileUrl);
      }
    });
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
    uploadedBannerUrl,
  };
};

export default useCoverTab;
