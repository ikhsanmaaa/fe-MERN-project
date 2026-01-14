import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@heroui/react";

interface PropTypes {
  dataCategory: ICategory;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory } = props;
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="text-xl font-bold w-full">Information Icon</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <Input
            type="text"
            className="mt-2"
            label="Name"
            labelPlacement="outside-top"
            variant="bordered"
            defaultValue={dataCategory?.name}
            classNames={{
              inputWrapper: "h-12 px-0 py-0",
              input: "h-full pl-3 ",
            }}
          />
          <Textarea
            type="text"
            className="mt-2"
            label="Description"
            labelPlacement="outside-top"
            variant="bordered"
            defaultValue={dataCategory?.description}
            classNames={{
              inputWrapper: "h-12 px-0 py-0",
              input: "h-full pl-3 pt-2",
            }}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default InfoTab;
