"use client";

import { Button, Input, Spinner } from "@heroui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/cn";
import { ILogin } from "@/types/Auth";
import { signIn } from "next-auth/react";

const LoginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your Email or Password"),
  password: yup.string().required("Please input your password"),
});

function FormLogin() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const searchParams = useSearchParams();
  const callbackUrl: string =
    (searchParams.get("callbackUrl") as string) || "/";
  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result?.status === 401) {
      throw new Error("Login Failed");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(errors) {
      setError("root", {
        message: errors.message,
      });
    },
    onSuccess: () => {
      router.push(callbackUrl);
      reset();
    },
  });
  const handleLogin = (data: ILogin) => {
    mutateLogin(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  return (
    <form
      className={cn(
        "flex w-80 flex-col gap-4",
        Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
      )}
      onSubmit={handleSubmit(handleLogin)}
    >
      {errors.root?.message}
      <Controller
        name="identifier"
        control={control}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="text"
              label="Email / Username"
              variant="bordered"
              autoComplete="off"
              isInvalid={errors.identifier !== undefined}
              errorMessage={errors.identifier?.message}
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
              type={isVisible ? "text" : "password"}
              label="Password"
              variant="bordered"
              autoComplete="off"
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
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
        {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
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

export { ButtonSuccess, FormLogin };
