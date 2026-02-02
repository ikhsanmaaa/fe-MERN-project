import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { ITicketsForm, ITicketsUpdate } from "@/types/Ticket";

interface PropTypes {
  dataTickets: ITicketsUpdate;
  isOpen: boolean;
  onClose: () => void;
  refetchTickets: () => void;
  onOpenChange: () => void;
  selectedDataTicket: ITicketsForm | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicketsForm | null>>;
}

const UpdateTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    refetchTickets,
    onOpenChange,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;
  const {
    controlUpdateTicket,
    errorsTicketUpdate,
    reset,
    handleSubmitUpdateTicket,
    isPendingMutateUpdateTickets,
    isSuccessMutateUpdateTickets,
    setValueUpdateTickets,
    handleUpdateTickets,
  } = useUpdateTicketModal(`${selectedDataTicket?._id}`);

  useEffect(() => {
    if (selectedDataTicket) {
      setValueUpdateTickets("price", `${selectedDataTicket.price}`);
      setValueUpdateTickets("name", `${selectedDataTicket.name}`);
      setValueUpdateTickets("description", `${selectedDataTicket.description}`);
      setValueUpdateTickets("quantity", `${selectedDataTicket.quantity}`);
    }
  }, [selectedDataTicket]);

  useEffect(() => {
    if (isSuccessMutateUpdateTickets) {
      onClose();
      refetchTickets();
      setSelectedDataTicket(null);
    }
  }, [isSuccessMutateUpdateTickets]);

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitUpdateTicket(handleUpdateTickets)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Ticket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
              <p className="text-sm font-bold">Information</p>

              <Controller
                name="name"
                control={controlUpdateTicket}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="ticket category"
                    labelPlacement="inside"
                    type="text"
                    isInvalid={errorsTicketUpdate.name !== undefined}
                    errorMessage={errorsTicketUpdate.name?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={controlUpdateTicket}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="price"
                    variant="bordered"
                    labelPlacement="inside"
                    type="number"
                    isInvalid={errorsTicketUpdate.price !== undefined}
                    errorMessage={errorsTicketUpdate.price?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={controlUpdateTicket}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="description"
                    variant="bordered"
                    labelPlacement="inside"
                    type="text"
                    isInvalid={errorsTicketUpdate.description !== undefined}
                    errorMessage={errorsTicketUpdate.description?.message}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={controlUpdateTicket}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="quantity"
                    variant="bordered"
                    labelPlacement="inside"
                    type="number"
                    isInvalid={errorsTicketUpdate.quantity !== undefined}
                    errorMessage={errorsTicketUpdate.quantity?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateUpdateTickets}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateUpdateTickets}
            >
              {isPendingMutateUpdateTickets ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Tickets"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateTicketModal;
