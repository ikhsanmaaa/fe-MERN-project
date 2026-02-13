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
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchTransaction: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTransactionModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    refetchTransaction,
    onClose,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTransaction) {
      onClose();
      setSelectedId("");
      refetchTransaction();
    }
  }, [isSuccessMutateDeleteTransaction]);

  const handleDelete = () => {
    if (!selectedId) {
      addToast({
        title: "Error",
        description: "Transaction ID not found",
        color: "danger",
      });
      return;
    }

    mutateDeleteTransaction(selectedId);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Transaction</ModalHeader>
        <ModalBody>
          <p className="text-medium ">
            Are you sure you want to delete this Transaction?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={handleDelete}
            disabled={isPendingMutateDeleteTransaction || !selectedId}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTransaction}
            onPress={() => mutateDeleteTransaction(selectedId)}
          >
            {isPendingMutateDeleteTransaction ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Transaction"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTransactionModal;
