import categoryServices from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const useEventFilter = () => {
  const { control } = useForm({
    defaultValues: {
      category: "",
      isFeatured: "",
      isOnline: "",
    },
  });
  const { data: dataCategoriesFilter, isSuccess: isSuccessCategoriesFilter } =
    useQuery({
      queryKey: ["CategoriesFilter"],
      queryFn: () => categoryServices.getCategories(),
    });

  return {
    control,

    dataCategoriesFilter,
    isSuccessCategoriesFilter,
  };
};

export default useEventFilter;
