"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface PropTypes {
  pathname: string;
  label: string;
}

const ButtonSuccess = (props: PropTypes) => {
  const router = useRouter();
  const { pathname, label } = props;
  return (
    <Button
      className="mt-4 w-fit"
      variant="bordered"
      color="danger"
      onPress={() => router.push(`${pathname}`)}
    >
      {label}
    </Button>
  );
};

export default ButtonSuccess;
