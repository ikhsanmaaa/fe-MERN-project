"use client";

import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";
export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export default function Sidebar({
  items,
}: {
  items: {
    key: string;
    label: string;
    href: string;
    icon?: React.ElementType;
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="relative z-50 flex h-screen w-full max-w-[300px] flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all">
      <div>
        <div className="flex justify-center w-full">
          <Image
            src={"/images/general/logo.png"}
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32"
            onClick={() => router.push("/")}
          />
        </div>
        <ListboxWrapper>
          <Listbox items={items} variant="solid" aria-label="Dasboard Menu">
            {(items) => (
              <ListboxItem
                key={items.key}
                className={cn("my-1 h-12 text-2xl", {
                  "bg-danger-500 text-white": pathname.startsWith(items.href),
                })}
                startContent={items.icon && <items.icon />}
                textValue={items.label}
                aria-labelledby={items.label}
                aria-describedby={items.label}
              >
                <p>{items.label}</p>
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
      </div>
      <div className="flex items-center p-1">
        <Button
          color="danger"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          onPress={() => signOut()}
        >
          <CiLogout /> logout
        </Button>
      </div>
    </div>
  );
}

{
  /* <aside className="w-64 bg-gray-100 h-screen p-4">
      <ul>
        {items.map((item) => (
          <li key={item.href} className="mb-2">
            <Link href={item.href} className="flex items-center gap-2">
              {item.icon && <item.icon />}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside> */
}
