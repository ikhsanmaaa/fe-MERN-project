import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketsModal from "./useDeleteTicketModal";
import { ITicketsForm, ITicketsPayload } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchTickets: () => void;
  onOpenChange: () => void;
  selectedDataTicket: ITicketsForm | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicketsForm | null>>;
}

const DeleteTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    refetchTickets,
    onClose,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;

  const {
    mutateDeleteTickets,
    isPendingMutateDeleteTickets,
    isSuccessMutateDeleteTickets,
  } = useDeleteTicketsModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTickets) {
      onClose();
      setSelectedDataTicket(null);
      refetchTickets();
    }
  }, [isSuccessMutateDeleteTickets]);

  const handleDelete = () => {
    if (!selectedDataTicket) {
      addToast({
        title: "Error",
        description: "Ticket ID not found",
        color: "danger",
      });
      return;
    }

    mutateDeleteTickets(`${selectedDataTicket._id}`);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-medium ">
            Are you sure you want to delete this Ticket?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={handleDelete}
            disabled={isPendingMutateDeleteTickets || !selectedDataTicket}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTickets}
            onPress={() => mutateDeleteTickets(`${selectedDataTicket?._id}`)}
          >
            {isPendingMutateDeleteTickets ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Ticket"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
