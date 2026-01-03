import { Card, CardBody } from "@heroui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FormLogin } from "./useLogin";

export const metadata: Metadata = {
  title: "MERN | Login",
};

export default function Login() {
  return (
    <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 mt-20">
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
            <h2 className="text-2xl font-bold text-danger-500">Login</h2>
            <p className="text-small mb-4 mt-2">
              Don{"'"}t have an account?&nbsp;
              <Link
                href={"/auth/register"}
                className="font-semibold text-danger-400"
              >
                Register Here
              </Link>
            </p>
            <FormLogin />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
