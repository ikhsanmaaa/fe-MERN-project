import InputFile from "@/ui/InputFile/InputFile";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useImageTab from "./useImageTab";
import { IBannerUpdateIcon } from "@/types/Banner";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IBannerUpdateIcon) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const {
    handleDeleteImage,
    handleUploadImage,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    preview,
    resetUpdateImage,
  } = useImageTab();

  const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">Banner Image</h1>
        <p className="text-small text-default-400 w-full">
          Manage Image of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-default-700">
              Current Image
            </p>

            <Image alt="Image" src={currentImage} fill className="!relative" />
          </div>
          <Controller
            name="image"
            control={controlUpdateImage}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadImage(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeleteImage(onChange)}
                isInvalid={errorsUpdateImage.image !== undefined}
                errorMessage={errorsUpdateImage.image?.message}
                isDropable
                preview={typeof preview === "string" ? preview : ""}
                label={
                  <p className="text-sm font-medium text-default-700 mb-2">
                    Upload New Image
                  </p>
                }
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default ImageTab;
