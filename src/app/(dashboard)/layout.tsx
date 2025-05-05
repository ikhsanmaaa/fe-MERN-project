"use client";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import Sidebar from "./sidebarLayout";
import { adminItems, memberItems } from "./sidebarComponent";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let sidebarItems;
  if (pathname.startsWith("/admin")) {
    sidebarItems = adminItems;
  } else if (pathname.startsWith("/member")) {
    sidebarItems = memberItems;
  } else {
    notFound();
  }
  return (
    <div className="max-w-screen-3xl 3xl:container flex">
      <Sidebar items={sidebarItems} />
      <main className="h-screen w-full overflow-y-auto p-8">{children}</main>
    </div>
  );
}
