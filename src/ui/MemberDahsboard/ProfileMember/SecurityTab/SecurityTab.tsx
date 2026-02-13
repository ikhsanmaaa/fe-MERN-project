import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useSecurityTab from "./useSecurityTab";
import useProfile from "../useProfile";

const SecurityTab = () => {
  const { handleUploadPassword, isPendingMutateUpdatePassword } = useProfile();

  const {
    controlUpdateSecurity,
    isValid,
    handleSubmitUpdateSecurity,
    errorsUpdateSecurity,
  } = useSecurityTab();

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">Security</h1>
        <p className="text-small text-default-400 w-full">
          Update your account security
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateSecurity(handleUploadPassword)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdateSecurity}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                label="Old password"
                labelPlacement="outside"
                type="text"
                placeholder="Input your old password"
                isInvalid={errorsUpdateSecurity.oldPassword !== undefined}
                errorMessage={errorsUpdateSecurity.oldPassword?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={controlUpdateSecurity}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                label="Password"
                labelPlacement="outside"
                type="text"
                placeholder="input your new password"
                isInvalid={errorsUpdateSecurity.password !== undefined}
                errorMessage={errorsUpdateSecurity.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdateSecurity}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                label="Confirm password"
                labelPlacement="outside"
                type="password"
                placeholder="confirm your new password"
                isInvalid={errorsUpdateSecurity.confirmPassword !== undefined}
                errorMessage={errorsUpdateSecurity.confirmPassword?.message}
              />
            )}
          />

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdatePassword || !isValid}
          >
            {isPendingMutateUpdatePassword ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default SecurityTab;
