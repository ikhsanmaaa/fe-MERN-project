"use client";
import { Button } from "@heroui/react";
interface ButtonHomePageProps {
  buttonName: string;
}
const ButtonHomePage = ({ buttonName }: ButtonHomePageProps) => {
  return <Button color="primary">{buttonName}</Button>;
};

export default ButtonHomePage;
