import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBannersPayload, IBannersUpdateInfo } from "@/types/Banner";

interface PropTypes {
  dataBanner: IBannersPayload;
  onUpdate: (data: IBannersUpdateInfo) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    setValueUpdateInfo,
    resetUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${dataBanner.title}`);
    setValueUpdateInfo("isShow", dataBanner.isShow ? "true" : "false");
  }, [dataBanner]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">Information Image</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Controller
            name="title"
            control={controlUpdateInfo}
            render={({ field }) => (
              <Input
                {...field}
                autoFocus
                variant="bordered"
                label="Title"
                labelPlacement="outside"
                type="text"
                isInvalid={errorsUpdateInfo.title !== undefined}
                errorMessage={errorsUpdateInfo.title?.message}
              />
            )}
          />
          <Controller
            name="isShow"
            control={controlUpdateInfo}
            render={({ field }) => (
              <Select
                {...field}
                selectedKeys={[field.value]}
                variant="bordered"
                label="Publish"
                labelPlacement="inside"
                isInvalid={errorsUpdateInfo.isShow !== undefined}
                errorMessage={errorsUpdateInfo.isShow?.message}
                disallowEmptySelection
              >
                <SelectItem key="true">Publish</SelectItem>
                <SelectItem key="false">Draft</SelectItem>
              </Select>
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataBanner?._id}
          >
            {isPendingUpdate ? (
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
export default InfoTab;
