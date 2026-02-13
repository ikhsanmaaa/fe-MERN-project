import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfoProfile = yup.object({
  username: yup.string().required("Please input name"),
  email: yup.string().required("Please input slug"),
  role: yup.string().required("Please input slug"),
  fullName: yup.string().required("Please input slug"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfoProfile,
    handleSubmit: handleSubmitUpdateInfoProfile,
    formState: { errors: errorsUpdateInfoProfile },
    reset: resetUpdateInfoProfile,
    setValue: setValueUpdateInfoProfile,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfoProfile),
  });

  return {
    controlUpdateInfoProfile,
    handleSubmitUpdateInfoProfile,
    errorsUpdateInfoProfile,
    setValueUpdateInfoProfile,
    resetUpdateInfoProfile,
  };
};

export default useInfoTab;
