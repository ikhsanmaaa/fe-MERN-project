"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete: () => void;
  labelButtonDetails: string;
}

const DropdownAction = (props: PropTypes) => {
  const { onPressButtonDetail, onPressButtonDelete, labelButtonDetails } =
    props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail event button" onPress={onPressButtonDetail}>
          {String(labelButtonDetails)}
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
