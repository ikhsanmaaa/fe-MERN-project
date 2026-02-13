import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateSecurity = yup.object({
  oldPassword: yup.string().required("Please input old password"),
  password: yup
    .string()
    .min(8, "password min 8 character")
    .matches(/[A-Z]/, "required 1 uppercase letter")
    .matches(/[0-9]/, "required 1 number")
    .required("Please input new password"),
  confirmPassword: yup
    .string()
    .required("Please confirm new password")
    .oneOf([yup.ref("password")], "Password didn't match"),
});

const useSecurityTab = () => {
  const {
    control: controlUpdateSecurity,
    handleSubmit: handleSubmitUpdateSecurity,
    formState: { errors: errorsUpdateSecurity, isValid },
    reset: resetUpdateSecurity,
    setValue: setValueUpdateSecurity,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaUpdateSecurity),
  });

  return {
    isValid,
    controlUpdateSecurity,
    handleSubmitUpdateSecurity,
    errorsUpdateSecurity,
    setValueUpdateSecurity,
    resetUpdateSecurity,
  };
};

export default useSecurityTab;
