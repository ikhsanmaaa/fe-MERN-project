"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useMediaHandling from "@/hooks/useMediaHandling";

const schemaUpdatePicture = yup.object({
  profilePicture: yup
    .mixed<FileList | string>()
    .required("Please input Picture of Event"),
});

const usePictureTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    reset: resetUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValueUpdatePicture,
    watch,
  } = useForm({
    resolver: yupResolver(schemaUpdatePicture),
  });

  const previewPicture = watch("profilePicture");
  const fileUrl = getValuesUpdatePicture("profilePicture");

  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(
      files,
      onChange,
      (fileUrl: string | string | undefined) => {
        if (fileUrl) {
          setValueUpdatePicture("profilePicture", fileUrl);
        }
      },
    );
  };

  return {
    handleDeletePicture,
    handleUploadPicture,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    previewPicture,
  };
};

export default usePictureTab;
