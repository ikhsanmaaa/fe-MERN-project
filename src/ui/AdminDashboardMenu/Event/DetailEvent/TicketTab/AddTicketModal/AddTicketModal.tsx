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
import { useEffect } from "react";
import useAddTicketModal from "./useAddTicketModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchTickets: () => void;
  onOpenChange: () => void;
}

const AddTicketModal = (props: PropTypes) => {
  const { isOpen, onClose, refetchTickets, onOpenChange } = props;
  const {
    controlFormTicket,
    errorsTicketForm,
    handleSubmitFormTicket,
    handleAddTickets,
    isPendingMutateAddTickets,
    isSuccessMutateAddTickets,
    reset,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessMutateAddTickets) {
      onClose();
      refetchTickets();
    }
  }, [isSuccessMutateAddTickets]);

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
      <form onSubmit={handleSubmitFormTicket(handleAddTickets)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
              <p className="text-sm font-bold">Information</p>

              <Controller
                name="name"
                control={controlFormTicket}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="ticket category"
                    labelPlacement="inside"
                    type="text"
                    isInvalid={errorsTicketForm.name !== undefined}
                    errorMessage={errorsTicketForm.name?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={controlFormTicket}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="price"
                    variant="bordered"
                    labelPlacement="inside"
                    type="number"
                    isInvalid={errorsTicketForm.price !== undefined}
                    errorMessage={errorsTicketForm.price?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={controlFormTicket}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="description"
                    variant="bordered"
                    labelPlacement="inside"
                    type="text"
                    isInvalid={errorsTicketForm.description !== undefined}
                    errorMessage={errorsTicketForm.description?.message}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={controlFormTicket}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="quantity"
                    variant="bordered"
                    labelPlacement="inside"
                    type="number"
                    isInvalid={errorsTicketForm.quantity !== undefined}
                    errorMessage={errorsTicketForm.quantity?.message}
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
              disabled={isPendingMutateAddTickets}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateAddTickets}
            >
              {isPendingMutateAddTickets ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Tickets"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
