import InputFile from "@/ui/InputFile/InputFile";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventBannerForm } from "@/types/Event";
import useCoverTab from "./useCoverTab";

interface PropTypes {
  currentCover: string;
  onUpdateCover: (data: IEventBannerForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab = (props: PropTypes) => {
  const {
    handleDeleteCover,
    handleUploadCover,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    controlUpdateCover,
    handleSubmitUpdateCover,
    errorsUpdateCover,
    previewBanner,
    resetUpdateCover,
  } = useCoverTab();

  const { currentCover, onUpdateCover, isPendingUpdate, isSuccessUpdate } =
    props;

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateCover();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">Event Cover</h1>
        <p className="text-small text-default-400 w-full">
          Manage Cover of this Event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdateCover)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Cover
            </p>

            {currentCover && (
              <div className="relative w-full h-[220px] rounded-lg overflow-hidden">
                <Image
                  alt="cover"
                  src={`${currentCover}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          <Controller
            name="banner"
            control={controlUpdateCover}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadCover(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeleteCover(onChange)}
                isInvalid={errorsUpdateCover.banner !== undefined}
                errorMessage={errorsUpdateCover.banner?.message}
                isDropable
                preview={typeof previewBanner === "string" ? previewBanner : ""}
                label={
                  <p className="text-sm font-medium text-default-700">
                    Upload New Cover
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
              isPendingMutateUploadFile || isPendingUpdate || !previewBanner
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
export default CoverTab;
