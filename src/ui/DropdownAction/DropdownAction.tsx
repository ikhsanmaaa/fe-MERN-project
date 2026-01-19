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
}

const DropdownAction = (props: PropTypes) => {
  const { onPressButtonDetail, onPressButtonDelete } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail event button" onPress={onPressButtonDetail}>
          Details
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger-500"
          onPress={onPressButtonDelete}
          // deleteCategoryModal.onOpen();
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
