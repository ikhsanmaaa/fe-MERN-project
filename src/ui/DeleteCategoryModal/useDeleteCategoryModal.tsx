import categoryServices from "@/services/category.services";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategoryModal = () => {
  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingMutateDeleteCategory,
    isSuccess: isSuccessMutateDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      addToast({
        title: "succes",
        description: "Delete category success!",
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
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  };
};

export default useDeleteCategoryModal;
