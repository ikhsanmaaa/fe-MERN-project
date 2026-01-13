import { Card, CardBody } from "@heroui/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FormRegister } from "./useRegister";

export const metadata: Metadata = {
  title: "MERN | Register",
};

export default function Register() {
  return (
    <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
      <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.png"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          className="w-2/3 lg:w-full"
          src="/images/illustration/login.svg"
          alt="login"
          width={1024}
          height={1024}
        />
      </div>
      <div>
        <Card>
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold text-danger-500">
              Create Account
            </h2>
            <p className="text-small mb-4 mt-2">
              Have an account?&nbsp;
              <Link
                href={"/auth/login"}
                className="font-semibold text-danger-400"
              >
                Login Here
              </Link>
            </p>
            <FormRegister />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
