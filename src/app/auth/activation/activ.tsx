"use client";
import { Metadata } from "next";
import Image from "next/image";
import { ButtonSuccess } from "@/app/auth/register/useRegister";

export const metadata: Metadata = {
  title: "MERN | Activation",
};

interface PropTypes {
  status: "success" | "failed";
}
export default function Activation(props: PropTypes) {
  const { status } = props;
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.png"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustration/success.svg"
              : "/images/illustration/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-danger-500">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {status === "success"
            ? "Thank you for register account"
            : "Confirmation account is invalid"}
        </p>
        <ButtonSuccess />
      </div>
    </div>
  );
}
