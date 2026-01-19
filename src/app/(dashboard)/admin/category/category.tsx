"use client";

import DataTable from "@/ui/DataTable/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";

import useCategory from "./useCategory";
import { COLUMN_LIST_CATEGORY } from "./categoryConstant";
import AddCategoryModal from "../../../../ui/AddCategoryModal/AddCategoryModal";
import DeleteCategoryModal from "../../../../ui/DeleteCategoryModal/DeleteCategoryModal";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/ui/DropdownAction/DropdownAction";

const Category = () => {
  const router = useRouter();
  const {
    currentPage,
    currentLimit,

    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image
              src={String(cellValue)}
              alt="icon"
              width={100}
              height={100}
            />
          );

        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                router.push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [router],
  );

  return (
    <section>
      <DataTable
        columns={COLUMN_LIST_CATEGORY}
        currentPage={Number(currentPage)}
        data={dataCategory?.data || []}
        emptyContent="Category is empty"
        isLoading={isLoadingCategory || isRefetchingCategory}
        limit={String(currentLimit)}
        totalPages={dataCategory?.pagination.totalPages}
        renderCell={renderCell}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
        onChangeSearch={handleSearch}
        onClearSearch={handleClearSearch}
        buttonTopContentLabel="Create Category"
        onClickButtonTopContent={addCategoryModal.onOpen}
      />

      <AddCategoryModal
        {...addCategoryModal}
        refetchCategory={refetchCategory}
      />
      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default Category;
