"use client";

import { useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

export default function AuthSessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated" && !hasShownToast.current) {
      hasShownToast.current = true;

      addToast({
        title: "Session expired",
        description: "Silakan login kembali",
        color: "warning",
        timeout: 4000,
        shouldShowTimeoutProgress: true,
      });
      signOut();
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return <>{children}</>;
}
