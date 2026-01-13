import ButtonHomePage from "@/ui/ButtonHomePage/buttonHomePage";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};
export default function Home() {
  return (
    <>
      <div className="flex justify-evenly">
        <Link href={"/auth/login"}>
          <ButtonHomePage buttonName="login" />
        </Link>
        <Link href={"/admin/dashboard"}>
          <ButtonHomePage buttonName="dashboard admin" />
        </Link>
      </div>
    </>
  );
}
