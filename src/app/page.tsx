import { Button } from "@heroui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};
export default function Home() {
  return (
    <>
      <Button color="primary">Button</Button>
    </>
  );
}
