"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebarLayout";
import { adminItems, memberItems } from "./sidebarComponent";

export default function SidebarWrapper() {
  const pathname = usePathname();

  let sidebarItems: {
    key: string;
    label: string;
    href: string;
    icon?: React.ElementType;
  }[];
  if (pathname.startsWith("/admin")) {
    sidebarItems = adminItems;
  } else if (pathname.startsWith("/member")) {
    sidebarItems = memberItems;
  } else {
    sidebarItems = []; // fallback jika tidak cocok
  }

  return <Sidebar items={sidebarItems} />;
}
