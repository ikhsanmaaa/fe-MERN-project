"use client";

import DataTable from "@/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";

import Image from "next/image";
import DropdownAction from "@/ui/DropdownAction/DropdownAction";
import useBanner from "./useBanner";
import { COLUMN_LIST_Banner } from "./bannerConstant";
import AddBannerModal from "@/ui/AddBannerModal/AddBannerModal";
import DeleteBannerModal from "@/ui/DeleteBannerModal/DeleteBannerModal";

const Banner = () => {
  const router = useRouter();

  const {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();

  const renderCell = useCallback(
    (Banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = Banner[columnKey as keyof typeof Banner];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={String(cellValue)}
              alt="image"
              width={100}
              height={100}
            />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              labelButtonDetails="Details"
              onPressButtonDetail={() =>
                router.push(`/admin/banners/${Banner._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(String(Banner._id));

                deleteBannerModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [router, setSelectedId, deleteBannerModal],
  );
  return (
    <section>
      <DataTable
        columns={COLUMN_LIST_Banner}
        data={dataBanner?.data || []}
        emptyContent="Banner is empty"
        isLoading={isLoadingBanner || isRefetchingBanner}
        totalPages={dataBanner?.pagination.totalPages}
        renderCell={renderCell}
        buttonTopContentLabel="Create Banner"
        onClickButtonTopContent={addBannerModal.onOpen}
      />

      <AddBannerModal {...addBannerModal} refetchBanner={refetchBanner} />
      <DeleteBannerModal
        {...deleteBannerModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchBanner={refetchBanner}
      />
    </section>
  );
};

export default Banner;
