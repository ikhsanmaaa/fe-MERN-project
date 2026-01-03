import SidebarWrapper from "./sidebarWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-3xl 3xl:container flex">
      <SidebarWrapper />
      <main className="h-screen w-full overflow-y-auto p-8">{children}</main>
    </div>
  );
}
