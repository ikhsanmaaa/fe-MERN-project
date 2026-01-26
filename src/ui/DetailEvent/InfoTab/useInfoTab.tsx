import categoryServices from "@/services/category.services";
import { IEventUpdateInfoForm } from "@/types/Event";
import { yupResolver } from "@hookform/resolvers/yup";
import { ZonedDateTime } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfoEvent = yup.object({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  description: yup.string().required("Please input description"),

  startDate: yup.mixed<ZonedDateTime>().required("Please select start date"),

  endDate: yup.mixed<ZonedDateTime>().required("Please select end date"),

  isOnline: yup
    .mixed<"true" | "false">()
    .oneOf(["true", "false"])
    .required("Please select status"),

  isFeatured: yup
    .mixed<"true" | "false">()
    .oneOf(["true", "false"])
    .required("Please select featured"),

  region: yup.mixed<string>().required("Please select region"),

  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfoEvent,
    handleSubmit: handleSubmitUpdateInfoEvent,
    formState: { errors: errorsUpdateInfoEvent },
    reset: resetUpdateInfoEvent,
    setValue: setValueUpdateInfoEvent,
  } = useForm<IEventUpdateInfoForm>({
    resolver: yupResolver(schemaUpdateInfoEvent),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryServices.getCategories(),
  });

  return {
    controlUpdateInfoEvent,
    handleSubmitUpdateInfoEvent,
    errorsUpdateInfoEvent,
    setValueUpdateInfoEvent,
    resetUpdateInfoEvent,
    dataCategory,
  };
};

export default useInfoTab;
