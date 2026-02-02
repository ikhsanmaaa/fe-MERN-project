import { IEventCreatePayload, IEventUpdateInfoForm } from "@/types/Event";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { ICategory } from "@/types/Category";
import {
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { IRegion } from "@/types/Region";
import { useDebounce } from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.constants";
import { useQuery } from "@tanstack/react-query";
import eventServices from "@/services/events.services";

interface PropTypes {
  dataEvent: IEventCreatePayload;
  onUpdate: (data: IEventUpdateInfoForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataEvent,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    dataDefaultRegion,
  } = props;

  const [searchRegency, setSearchRegency] = useState("");

  const debouncedSearchRegion = useDebounce(searchRegency, DELAY);

  const {
    controlUpdateInfoEvent,
    handleSubmitUpdateInfoEvent,
    errorsUpdateInfoEvent,
    setValueUpdateInfoEvent,
    resetUpdateInfoEvent,
    dataCategory,
  } = useInfoTab();

  const start = new Date(dataEvent.startDate);
  const end = new Date(dataEvent.endDate);

  useEffect(() => {
    setValueUpdateInfoEvent("name", `${dataEvent.name}`);
    setValueUpdateInfoEvent("description", `${dataEvent.description}`);
    setValueUpdateInfoEvent("slug", `${dataEvent.slug}`);
    setValueUpdateInfoEvent("category", `${dataEvent.category}`);
    setValueUpdateInfoEvent(
      "startDate",
      parseAbsoluteToLocal(start.toISOString()),
    );

    setValueUpdateInfoEvent("endDate", parseAbsoluteToLocal(end.toISOString()));
    setValueUpdateInfoEvent("isOnline", dataEvent.isOnline ? "true" : "false");
    setValueUpdateInfoEvent(
      "isFeatured",
      dataEvent.isFeatured ? "true" : "false",
    );
    setValueUpdateInfoEvent(
      "isPublish",
      dataEvent.isFeatured ? "true" : "false",
    );

    setValueUpdateInfoEvent("address", `${dataEvent.location.address}`);
    setValueUpdateInfoEvent("region", String(dataEvent.location.region));
    setValueUpdateInfoEvent("latitude", `${dataEvent.location.coordinates[0]}`);
    setValueUpdateInfoEvent(
      "longitude",
      `${dataEvent.location.coordinates[1]}`,
    );
  }, [dataEvent]);

  useEffect(() => {
    if (dataDefaultRegion) {
      setSearchRegency(dataDefaultRegion);
    }
  }, [dataDefaultRegion]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfoEvent();
    }
  }, [isSuccessUpdate]);

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
    enabled:
      typeof debouncedSearchRegion === "string" &&
      debouncedSearchRegion.trim() !== "",
  });

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">Information Icon</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfoEvent(onUpdate)}
        >
          <Controller
            name="name"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                variant="bordered"
                label="name"
                labelPlacement="inside"
                type="text"
                isInvalid={errorsUpdateInfoEvent.name !== undefined}
                errorMessage={errorsUpdateInfoEvent.name?.message}
              />
            )}
          />
          <Controller
            name="slug"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                label="slug"
                labelPlacement="inside"
                type="text"
                required
                isInvalid={errorsUpdateInfoEvent.slug !== undefined}
                errorMessage={errorsUpdateInfoEvent.slug?.message}
              />
            )}
          />
          <Controller
            name="category"
            control={controlUpdateInfoEvent}
            render={({ field: { onChange, ...field } }) => (
              <Autocomplete
                {...field}
                defaultItems={dataCategory?.data.data || []}
                selectedKey={field.value ?? null}
                variant="bordered"
                label="category"
                labelPlacement="inside"
                isInvalid={errorsUpdateInfoEvent.category !== undefined}
                errorMessage={errorsUpdateInfoEvent.category?.message}
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
            control={controlUpdateInfoEvent}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                granularity="minute"
                variant="bordered"
                label="Start Date"
                isInvalid={!!errorsUpdateInfoEvent.startDate}
                errorMessage={errorsUpdateInfoEvent.startDate?.message?.toString()}
              />
            )}
          />

          <Controller
            name="endDate"
            control={controlUpdateInfoEvent}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value ?? now(getLocalTimeZone())}
                onChange={onChange}
                granularity="minute"
                variant="bordered"
                label="End Date"
                labelPlacement="inside"
                isInvalid={!!errorsUpdateInfoEvent.endDate}
                errorMessage={errorsUpdateInfoEvent.endDate?.message?.toString()}
              />
            )}
          />

          <Controller
            name="isOnline"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Select
                {...field}
                selectedKeys={[field.value]}
                variant="bordered"
                label="Online"
                labelPlacement="inside"
                isInvalid={errorsUpdateInfoEvent.isOnline !== undefined}
                errorMessage={errorsUpdateInfoEvent.isOnline?.message}
                disallowEmptySelection
              >
                <SelectItem key="true">Online</SelectItem>
                <SelectItem key="false">Not Online</SelectItem>
              </Select>
            )}
          />
          <Controller
            name="isFeatured"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Select
                {...field}
                selectedKeys={[field.value]}
                variant="bordered"
                label="Feature"
                labelPlacement="inside"
                isInvalid={errorsUpdateInfoEvent.isOnline !== undefined}
                errorMessage={errorsUpdateInfoEvent.isOnline?.message}
                disallowEmptySelection
              >
                <SelectItem key="true">Yes</SelectItem>
                <SelectItem key="false">No</SelectItem>
              </Select>
            )}
          />

          <Controller
            name="isPublish"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Select
                {...field}
                selectedKeys={[field.value]}
                variant="bordered"
                label="Publish"
                labelPlacement="inside"
                isInvalid={errorsUpdateInfoEvent.isPublish !== undefined}
                errorMessage={errorsUpdateInfoEvent.isPublish?.message}
                disallowEmptySelection
              >
                <SelectItem key="true">Publish</SelectItem>
                <SelectItem key="false">Draft</SelectItem>
              </Select>
            )}
          />

          <Controller
            name="description"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Textarea
                {...field}
                label="description"
                variant="bordered"
                labelPlacement="outside"
                type="text"
                isInvalid={errorsUpdateInfoEvent.description !== undefined}
                errorMessage={errorsUpdateInfoEvent.description?.message}
              />
            )}
          />

          <p className="text-sm font-bold">Location</p>

          <Controller
            name="address"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                label="Address"
                labelPlacement="inside"
                type="text"
                isInvalid={errorsUpdateInfoEvent.address !== undefined}
                errorMessage={errorsUpdateInfoEvent.address?.message}
              />
            )}
          />

          <Controller
            key={dataDefaultRegion ?? "loading"}
            name="region"
            control={controlUpdateInfoEvent}
            render={({ field }) => (
              <Autocomplete
                defaultInputValue={dataDefaultRegion}
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
                  <AutocompleteItem
                    key={String(region.id)}
                    textValue={region.name}
                  >
                    {region.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />

          <div className="flex flex-col gap-5">
            <Controller
              name="latitude"
              control={controlUpdateInfoEvent}
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="latitude"
                  labelPlacement="inside"
                  type="number"
                  isInvalid={errorsUpdateInfoEvent.latitude !== undefined}
                  errorMessage={errorsUpdateInfoEvent.latitude?.message}
                />
              )}
            />
            <Controller
              name="longitude"
              control={controlUpdateInfoEvent}
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="longitude"
                  labelPlacement="inside"
                  type="number"
                  isInvalid={errorsUpdateInfoEvent.longitude !== undefined}
                  errorMessage={errorsUpdateInfoEvent.longitude?.message}
                />
              )}
            />
          </div>

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataEvent?._id}
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
export default InfoTab;
