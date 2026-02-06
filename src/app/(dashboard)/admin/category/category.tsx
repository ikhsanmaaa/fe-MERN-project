"use client";

import DataTable from "@/ui/DataTable/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";

import useCategory from "./useCategory";
import { COLUMN_LIST_CATEGORY } from "./categoryConstant";
import AddCategoryModal from "../../../../ui/MenuDashboardAdmin/Category/AddCategoryModal/AddCategoryModal";
import DeleteCategoryModal from "../../../../ui/MenuDashboardAdmin/Category/DeleteCategoryModal/DeleteCategoryModal";
import Image from "next/image";
import DropdownAction from "@/ui/DropdownAction/DropdownAction";

const Category = () => {
  const router = useRouter();

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
              labelButtonDetails="Details"
              onPressButtonDetail={() =>
                router.push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(String(category._id));

                deleteCategoryModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [router, setSelectedId, deleteCategoryModal],
  );
  return (
    <section>
      <DataTable
        columns={COLUMN_LIST_CATEGORY}
        data={dataCategory?.data || []}
        emptyContent="Category is empty"
        isLoading={isLoadingCategory || isRefetchingCategory}
        totalPages={dataCategory?.pagination.totalPages}
        renderCell={renderCell}
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
