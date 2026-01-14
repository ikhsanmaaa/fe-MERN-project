"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

interface Props {
  children: React.ReactNode;
}

export default function AuthSessionGuard({ children }: Props) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      addToast({
        title: "Session expired",
        description: "Silakan login kembali",
        color: "warning",
        timeout: 4000,
        shouldShowTimeoutProgress: true,
      });

      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return <>{children}</>;
}
