import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
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
import { useEffect, useState } from "react";
import useAddEventModal from "./useAddEventModal";
import { ICategory } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";
import { IRegion } from "@/types/Region";
import eventServices from "@/services/events.services";
import { useDebounce } from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.constants";
import { getLocalTimeZone, now, today } from "@internationalized/date";
import useMediaHandling from "@/hooks/useMediaHandling";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchEvent: () => void;
  onOpenChange: () => void;
}

const AddEventModal = (props: PropTypes) => {
  const { isOpen, onClose, refetchEvent, onOpenChange } = props;

  const [searchRegency, setSearchRegency] = useState("");

  const debouncedSearchRegion = useDebounce(searchRegency, DELAY);

  const { isPendingMutateDeleteFile, isPendingMutateUploadFile } =
    useMediaHandling();

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    preview,
    handleDeleteBanner,
    handleUploadBanner,
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

  const { data: dataRegion = [], isFetching: isFetchingRegion } = useQuery<
    IRegion[]
  >({
    queryKey: ["region", debouncedSearchRegion],
    queryFn: async () => {
      const res = await eventServices.searchLocationByRegency(
        debouncedSearchRegion,
      );
      return res.data.data;
    },
    enabled: debouncedSearchRegion.trim() !== "",
  });

  const isBannerValid = typeof preview === "string" && preview.length > 0;

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

              <div className="flex flex-col gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      variant="bordered"
                      label="name"
                      labelPlacement="inside"
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
                      labelPlacement="inside"
                      type="text"
                      required
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      variant="bordered"
                      label="category"
                      labelPlacement="inside"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search Category Here"
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
                  name="startDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value}
                      onChange={onChange}
                      granularity="minute"
                      variant="bordered"
                      label="Start Date"
                      isInvalid={!!errors.startDate}
                      errorMessage={errors.startDate?.message?.toString()}
                    />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value ?? now(getLocalTimeZone())}
                      onChange={onChange}
                      granularity="minute"
                      variant="bordered"
                      label="End Date"
                      labelPlacement="inside"
                      isInvalid={!!errors.endDate}
                      errorMessage={errors.endDate?.message?.toString()}
                    />
                  )}
                />

                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      variant="bordered"
                      label="Online"
                      labelPlacement="inside"
                      isInvalid={errors.isOnline !== undefined}
                      errorMessage={errors.isOnline?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true">Publish</SelectItem>
                      <SelectItem key="false">Draft</SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      variant="bordered"
                      label="Feature"
                      labelPlacement="inside"
                      isInvalid={errors.isFeatured !== undefined}
                      errorMessage={errors.isFeatured?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true">Yes</SelectItem>
                      <SelectItem key="false">No</SelectItem>
                    </Select>
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
              </div>

              <p className="text-sm font-bold">Location</p>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    items={dataRegion}
                    inputValue={searchRegency}
                    onInputChange={setSearchRegency}
                    isLoading={isFetchingRegion}
                    variant="bordered"
                    label="City"
                    labelPlacement="inside"
                    placeholder="Search City Here"
                    selectedKey={field.value}
                    onSelectionChange={(key) => {
                      const selected = dataRegion.find(
                        (item) => item.id.toString() === key,
                      );

                      if (selected) {
                        field.onChange(selected.id.toString());
                        setSearchRegency(selected.name);
                      }
                    }}
                  >
                    {(region: IRegion) => (
                      <AutocompleteItem key={region.id.toString()}>
                        {region.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />

              <div className="flex flex-col gap-5">
                <Controller
                  name="latitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="bordered"
                      label="latitude"
                      labelPlacement="inside"
                      type="number"
                      isInvalid={errors.latitude !== undefined}
                      errorMessage={errors.latitude?.message}
                    />
                  )}
                />
                <Controller
                  name="longitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="bordered"
                      label="longitude"
                      labelPlacement="inside"
                      type="number"
                      isInvalid={errors.longitude !== undefined}
                      errorMessage={errors.longitude?.message}
                    />
                  )}
                />
              </div>
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
              disabled={
                disabledSubmit || isPendingMutateAddEvent || !isBannerValid
              }
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
