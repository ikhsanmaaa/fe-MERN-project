import { Button } from "@heroui/button";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};
export default function Home() {
  return (
    <>
      <Link href={"/auth/login"}>
        <Button color="primary">Login</Button>
      </Link>
      <Link href={"/admin/dashboard"}>
        <Button color="primary">dashboard admin</Button>
      </Link>
    </>
  );
}
