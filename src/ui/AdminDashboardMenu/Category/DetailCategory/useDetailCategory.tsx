"use client";

import categoryServices from "@/services/category.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ICategory } from "@/types/Category";
import useUpdateCategory from "./useUpdateCategory";
import { addToast } from "@heroui/react";

const useDetailCategory = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { updateCategory } = useUpdateCategory();

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  const {
    data: dataCategory,
    isLoading,
    error,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      refetchCategory();
      addToast({
        title: "success",
        description: "Success Update Category!",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const handleUploadCategory = (data: ICategory) => mutateUpdateCategory(data);

  return {
    dataCategory,
    isLoading,
    error,
    handleUploadCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  };
};

export default useDetailCategory;
