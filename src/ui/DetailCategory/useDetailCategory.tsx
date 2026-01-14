"use client";

import categoryServices from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useDetailCategory = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  const {
    data: dataCategory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });

  return {
    dataCategory,
    isLoading,
    error,
  };
};

export default useDetailCategory;
