import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";

const EventFilter = () => {
  const { control, dataCategoriesFilter, isSuccessCategoriesFilter } =
    useEventFilter();

  const {
    handleCategoryChange,
    handleIsOnlineChange,
    handleIsFeaturedChange,
    currentCategory,
  } = useChangeUrl();

  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      {isSuccessCategoriesFilter ? (
        <div className="mt-4 flex flex-col gap-4">
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Autocomplete
                {...field}
                selectedKey={currentCategory ?? value ?? null}
                items={dataCategoriesFilter?.data.data || []}
                variant="bordered"
                label="Category"
                labelPlacement="inside"
                onSelectionChange={(key) => {
                  const categoryId = key ? String(key) : null;
                  onChange(categoryId);
                  handleCategoryChange(categoryId);
                }}
                placeholder="Search Category Here"
              >
                {(category: ICategory) => (
                  <AutocompleteItem key={category._id}>
                    {category.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
          <Controller
            name="isOnline"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Select
                {...field}
                selectedKeys={value ? new Set([value]) : new Set()}
                variant="bordered"
                label="Online"
                labelPlacement="inside"
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0];
                  const value =
                    selectedKey != null ? String(selectedKey) : null;

                  onChange(value);
                  handleIsOnlineChange(value);
                }}
              >
                <SelectItem key="true">Online</SelectItem>
                <SelectItem key="false">Not Online</SelectItem>
              </Select>
            )}
          />

          <Controller
            name="isFeatured"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Select
                {...field}
                selectedKeys={value ? new Set([value]) : new Set()}
                variant="bordered"
                label="Feature"
                labelPlacement="inside"
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0];
                  const value =
                    selectedKey != null ? String(selectedKey) : null;

                  onChange(value);
                  handleIsFeaturedChange(value);
                }}
              >
                <SelectItem key="true">Yes</SelectItem>
                <SelectItem key="false">No</SelectItem>
              </Select>
            )}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      )}
    </div>
  );
};

export default EventFilter;
