import { Metadata } from "next";
import LoginForm from "./LoginForn";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MERN | Login",
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
