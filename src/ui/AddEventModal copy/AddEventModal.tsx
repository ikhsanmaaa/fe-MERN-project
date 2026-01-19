import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import InputFile from "@/ui/InputFile/InputFile";
import { useEffect } from "react";
import useAddEventModal from "./useAddEventModal";
import { ICategory } from "@/types/Category";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchEvent: () => void;
  onOpenChange: () => void;
}

const AddEventModal = (props: PropTypes) => {
  const { isOpen, onClose, refetchEvent, onOpenChange } = props;
  const {
    control,
    errors,
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
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessMutateAddEvent]);

  const disabledSubmit =
    isPendingMutateAddEvent ||
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
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-2">
              <p className="text-sm font-bold">Information</p>

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    variant="bordered"
                    label="name"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="slug"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={errors.slug !== undefined}
                    errorMessage={errors.slug?.message}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data.data || []}
                    variant="bordered"
                    label="category"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={errors.category !== undefined}
                    errorMessage={errors.category?.message}
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={`${category._id}`}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="description"
                    variant="bordered"
                    labelPlacement="outside"
                    type="text"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <p className="text-sm font-bold">Cover</p>
              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    label
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    onDelete={() => handleDeleteBanner(onChange)}
                    isInvalid={errors.banner !== undefined}
                    errorMessage={errors.banner?.message}
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
              disabled={disabledSubmit || isPendingMutateAddEvent || !preview}
            >
              {isPendingMutateAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
