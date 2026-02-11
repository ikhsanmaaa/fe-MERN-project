import eventServices from "@/services/events.services";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModal = () => {
  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);
    return res;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingMutateDeleteEvent,
    isSuccess: isSuccessMutateDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      addToast({
        title: "succes",
        description: "Delete Event success!",
        color: "success",
      });
    },

    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
      });
    },
  });
  return {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  };
};

export default useDeleteEventModal;
