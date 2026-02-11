import { IBannersForm, IBannersUpdateInfo } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please input title of banner"),
  isShow: yup
    .mixed<"true" | "false">()
    .oneOf(["true", "false"])
    .required("Please select status"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm<IBannersUpdateInfo>({
    resolver: yupResolver(schemaUpdateInfo),
  });

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    setValueUpdateInfo,
    resetUpdateInfo,
  };
};

export default useInfoTab;
