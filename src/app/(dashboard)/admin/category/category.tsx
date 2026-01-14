"use client";

import DataTable from "@/ui/DataTable/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";

import useCategory from "./useCategory";
import { COLUMN_LIST_CATEGORY } from "./categoryConstant";
import AddCategoryModal from "../../../../hooks/AddCategoryModal/AddCategoryModal";
import DeleteCategoryModal from "../../../../hooks/DeleteCategoryModal/DeleteCategoryModal";
import Image from "next/image";

const Category = () => {
  const router = useRouter();

  const {
    currentPage,
    currentLimit,
    dataCategory,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    setURL,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const onClearSearch = () => {
    setURL({
      search: "",
      page: 1,
    });
  };

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
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail category button"
                  onPress={() => router.push(`/admin/category/${category._id}`)}
                >
                  Details
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${category._id}`);
                    deleteCategoryModal.onOpen();
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [router]
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
        onClearSearch={onClearSearch}
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
