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
import AddEventModal from "@/ui/Event/AddEventModal/AddEventModal";
import DeleteEventModal from "@/ui/Event/DeleteEventModal/DeleteEventModal";

const Event = () => {
  const router = useRouter();
  const {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
    selectedId,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

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

        case "isOnline":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Online" : "not Online"}
            </Chip>
          );
        case "isPublish":
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
                router.push(`/admin/event/${event._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(String(event._id));
                deleteEventModal.onOpen();
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
        data={dataEvent?.data || []}
        emptyContent="Event is empty"
        isLoading={isLoadingEvent || isRefetchingEvent}
        totalPages={dataEvent?.pagination.totalPages}
        renderCell={renderCell}
        buttonTopContentLabel="Create Event"
        onClickButtonTopContent={addEventModal.onOpen}
      />

      <AddEventModal {...addEventModal} refetchEvent={refetchEvent} />

      <DeleteEventModal
        {...deleteEventModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchEvent={refetchEvent}
      />
    </section>
  );
};

export default Event;
