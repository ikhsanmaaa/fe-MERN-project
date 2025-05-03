"use client";

import { Button, Input, Spinner } from "@heroui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your full name"),
  username: yup.string().required("Please input your username"),
  email: yup.string().email().required("Email format not valid"),
  password: yup
    .string()
    .min(8, "minimal 8 character")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "password not match")
    .required("Please input your password confirmation"),
});

function FormRegister() {
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };
  const router = useRouter();

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(errors) {
      setError("root", {
        message: errors.message,
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });
  const handleRegister = (data: IRegister) => {
    console.log(data);
    mutateRegister(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <form
      className={cn(
        "flex w-80 flex-col gap-4",
        Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
      )}
      onSubmit={handleSubmit(handleRegister)}
    >
      {errors.root?.message}
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="text"
              label="Fullname"
              variant="bordered"
              autoComplete="off"
              isInvalid={errors.fullName !== undefined}
              errorMessage={errors.fullName?.message}
            />
          );
        }}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="text"
              label="Username"
              variant="bordered"
              autoComplete="off"
              isInvalid={errors.username !== undefined}
              errorMessage={errors.username?.message}
            />
          );
        }}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="email"
              label="Email"
              variant="bordered"
              autoComplete="off"
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
            />
          );
        }}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type={visiblePassword.password ? "text" : "password"}
              label="Password"
              variant="bordered"
              autoComplete="off"
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => handleVisiblePassword("password")}
                >
                  {visiblePassword.password ? (
                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          );
        }}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type={visiblePassword.confirmPassword ? "text" : "password"}
              label="Password Confirmation"
              variant="bordered"
              autoComplete="off"
              isInvalid={errors.confirmPassword !== undefined}
              errorMessage={errors.confirmPassword?.message}
              endContent={
                <button
                  className="focus-outline:none"
                  type="button"
                  onClick={() => handleVisiblePassword("confirmPassword")}
                >
                  {visiblePassword.confirmPassword ? (
                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          );
        }}
      />
      <Button className="mt-4" color="danger" size="lg" type="submit">
        {isPendingRegister ? <Spinner color="white" size="sm" /> : "Register"}
      </Button>
    </form>
  );
}

function ButtonSuccess() {
  const router = useRouter();
  return (
    <Button
      className="mt-4 w-fit"
      variant="bordered"
      color="danger"
      onPress={() => router.push("/")}
    >
      Back To Home
    </Button>
  );
}

export { ButtonSuccess, FormRegister };
