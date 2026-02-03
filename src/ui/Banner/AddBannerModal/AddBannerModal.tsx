import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import InputFile from "@/ui/InputFile/InputFile";
import { useEffect } from "react";
import useMediaHandling from "@/hooks/useMediaHandling";
import useAddBannerModal from "./useAddBannerModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchBanner: () => void;
  onOpenChange: () => void;
}

const AddBannerModal = (props: PropTypes) => {
  const { isOpen, onClose, refetchBanner, onOpenChange } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,
    handleUploadIcon,
    preview,
    handleDeleteIcon,
    handleOnClose,
  } = useAddBannerModal();

  const { isPendingMutateDeleteFile, isPendingMutateUploadFile } =
    useMediaHandling();

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessMutateAddBanner]);

  const disabledSubmit =
    isPendingMutateAddBanner ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    variant="bordered"
                    label="title"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="bordered"
                    label="Publish"
                    labelPlacement="inside"
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Draft</SelectItem>
                  </Select>
                )}
              />
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    label
                    {...field}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    onDelete={() => handleDeleteIcon(onChange)}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              onPress={onClose}
              disabled={disabledSubmit || isPendingMutateAddBanner || !preview}
            >
              {isPendingMutateAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
