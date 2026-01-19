"use client";

import { addToast, Button, Input, Spinner } from "@heroui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
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
      addToast({
        title: "Login failed",
        description: errors.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      setError("root", {
        message: errors.message,
      });
    },
    onSuccess: () => {
      reset();
      addToast({
        title: "Login success!",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      router.push(`${callbackUrl}`);
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
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleLogin)}
    >
      {errors.root?.message && (
        <p className="text-sm text-danger">{errors.root.message}</p>
      )}

      <Controller
        name="identifier"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            fullWidth
            labelPlacement="outside"
            size="lg"
            label="Email / Username"
            variant="bordered"
            autoComplete="off"
            isInvalid={!!errors.identifier}
            errorMessage={errors.identifier?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            fullWidth
            labelPlacement="outside"
            size="lg"
            label="Password"
            variant="bordered"
            type={isVisible ? "text" : "password"}
            autoComplete="off"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                className="
                
                focus:outline-none
              "
              >
                {isVisible ? (
                  <FaEye className="text-lg text-default-400 pointer-events-none" />
                ) : (
                  <FaEyeSlash className="text-lg text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
        )}
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
