"use client";

import { useParams } from "next/navigation";
import categoryServices from "@/services/category.services";
import { ICategory } from "@/types/Category";

const useUpdateCategory = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const updateCategory = async (payload: ICategory) => {
    if (!id) {
      throw new Error("Category ID not found");
    }

    const { data } = await categoryServices.updateCategory(id, payload);
    return data.data;
  };

  return {
    updateCategory,
  };
};

export default useUpdateCategory;
