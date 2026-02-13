import InputFile from "@/ui/InputFile/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import usePictureTab from "./usePictureTab";
import { IProfileForm } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdatePicture: (data: IProfileForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
  const {
    handleDeletePicture,
    handleUploadPicture,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    previewPicture,
  } = usePictureTab();

  const { currentPicture, onUpdatePicture, isPendingUpdate, isSuccessUpdate } =
    props;

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">Profile Picture</h1>
        <p className="text-small text-default-400 w-full">
          Manage Picture of this Profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdatePicture)}
        >
          <div className="flex flex-col gap-2 items-center">
            <p className="text-sm font-medium text-default-700">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square w-1/2 rounded-lg"
            >
              <Avatar
                alt="Picture"
                src={`${currentPicture}`}
                showFallback
                className="aspect-square h-full w-full"
              />
            </Skeleton>
          </div>

          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadPicture(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeletePicture(onChange)}
                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                errorMessage={errorsUpdatePicture.profilePicture?.message}
                isDropable
                preview={
                  typeof previewPicture === "string" ? previewPicture : ""
                }
                label={
                  <p className="text-sm font-medium text-default-700">
                    Upload New Picture
                  </p>
                }
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile || isPendingUpdate || !previewPicture
            }
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
export default PictureTab;
