import DataTable from "@/ui/DataTable/DataTable";
import DropdownAction from "@/ui/DropdownAction/DropdownAction";
import convertIDR from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TICKETS } from "./ColumnListTicket";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal/AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal/DeleteTicketModal";
import { ITicketsForm } from "@/types/Ticket";
import UpdateTicketModal from "./UpdateTicketModal/UpdateTicketModal";

const TicketTab = () => {
  const {
    dataTickets,
    isPendingTickets,
    refetchTickets,
    isRefetchingTickets,
    selectedDataTicket,
    setSelectedDataTicket,
  } = useTicketTab();

  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const renderCell = useCallback(
    (tickets: Record<string, unknown>, columnKey: Key) => {
      const cellValue = tickets[columnKey as keyof typeof tickets];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;

        case "actions":
          return (
            <DropdownAction
              labelButtonDetails="Update Ticket"
              onPressButtonDetail={() => {
                setSelectedDataTicket(tickets as ITicketsForm);
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(tickets as ITicketsForm);
                deleteTicketModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4 ">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Tickets Event</h1>
            <p className="w-full text-small text-default-400">
              Manage ticket of this Event
            </p>
          </div>
          <Button color="danger" onPress={addTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            columns={COLUMN_LIST_TICKETS}
            data={dataTickets || []}
            emptyContent="Tickets is empty"
            isLoading={isPendingTickets || isRefetchingTickets}
            renderCell={renderCell}
            totalPages={1}
            showSearch={false}
            showLimit={false}
            onClickButtonTopContent={addTicketModal.onOpen}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTickets={refetchTickets} />
      <DeleteTicketModal
        {...deleteTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTickets={refetchTickets}
      />
      <UpdateTicketModal
        {...updateTicketModal}
        dataTickets={dataTickets}
        refetchTickets={refetchTickets}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />
    </Fragment>
  );
};

export default TicketTab;
