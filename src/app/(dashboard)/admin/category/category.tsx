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
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";

import useCategory from "./useCategory";
import { COLUMN_LIST_CATEGORY } from "./categoryConstant";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
// import InputFile from "@/ui/InputFile/InputFile";

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
  } = useCategory();

  const addCategoryModal = useDisclosure();

  const onClearSearch = () => {
    setURL({
      search: "",
      page: 1,
    });
  };

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      const value = item[columnKey as keyof typeof item];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={String(value)} alt="icon" width={40} height={40} />
        //   );

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
                  key="detail"
                  onPress={() => router.push(`/admin/category/${item._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger-500">
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );

        default:
          return value as ReactNode;
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
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
    </section>
  );
};

export default Category;
