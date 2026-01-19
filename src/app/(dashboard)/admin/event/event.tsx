"use client";

import DataTable from "@/ui/DataTable/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback } from "react";

import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import { COLUMN_LIST_EVENT } from "./event.constants";
import DropdownAction from "@/ui/DropdownAction/DropdownAction";
import AddEventModal from "@/ui/AddEventModal copy/AddEventModal";

const Event = () => {
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
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();
  // const deleteEventModal = useDisclosure();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="w-40 aspect-video object-cove rounded-lg"
              src={String(cellValue)}
              alt="icon"
              width={200}
              height={100}
            />
          );

        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "published" : "not published"}
            </Chip>
          );

        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                router.push(`/admin/event/${event._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
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
        columns={COLUMN_LIST_EVENT}
        currentPage={Number(currentPage)}
        data={dataEvent?.data || []}
        emptyContent="Event is empty"
        isLoading={isLoadingEvent || isRefetchingEvent}
        limit={String(currentLimit)}
        totalPages={dataEvent?.pagination.totalPages}
        renderCell={renderCell}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
        onChangeSearch={handleSearch}
        onClearSearch={handleClearSearch}
        buttonTopContentLabel="Create Event"
        onClickButtonTopContent={addEventModal.onOpen}
      />

      <AddEventModal {...addEventModal} refetchCategory={refetchEvent} />
    </section>
  );
};

export default Event;
