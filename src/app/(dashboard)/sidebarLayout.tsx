"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { cn } from "@/utils/cn";
import { signOut } from "next-auth/react";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon?: React.ElementType;
}

export default function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex h-screen w-[280px] flex-col justify-between border-r border-default-200 bg-white px-4 py-6">
      <div>
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/general/logo.png"
            alt="logo"
            width={160}
            height={50}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        <nav className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Button
                key={item.key}
                as={Link}
                href={item.href}
                startContent={item.icon && <item.icon />}
                variant={isActive ? "solid" : "light"}
                color={isActive ? "danger" : "default"}
                className={cn(
                  "h-12 justify-start gap-3 text-base font-medium",
                  !isActive && "text-default-700"
                )}
                fullWidth
              >
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      <Button
        color="danger"
        variant="light"
        className="h-12 justify-start gap-3"
        startContent={<CiLogout />}
        onPress={() => signOut()}
        fullWidth
      >
        Logout
      </Button>
    </aside>
  );
}
