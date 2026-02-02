"use client";

import useMediaHandling from "@/hooks/useMediaHandling";
import { IBannerUpdateIcon } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateImage = yup.object().shape({
  image: yup.mixed<FileList | string>().required("Please input banner image"),
});

const useImageTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateImage,
    handleSubmit: handleSubmitUpdateImage,
    formState: { errors: errorsUpdateImage },
    reset: resetUpdateImage,
    watch: watchUpdateImage,
    getValues: getValuesUpdateImage,
    setValue: setValueUpdateImage,
  } = useForm<IBannerUpdateIcon>({
    resolver: yupResolver(schemaUpdateImage),
  });

  const preview = watchUpdateImage("image");
  const fileUrl = getValuesUpdateImage("image");

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(
      files,
      onChange,
      (fileUrl: string | string | undefined) => {
        if (fileUrl) {
          setValueUpdateImage("image", fileUrl);
        }
      },
    );
  };

  return {
    handleDeleteImage,
    handleUploadImage,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    resetUpdateImage,
    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    preview,
  };
};

export default useImageTab;
