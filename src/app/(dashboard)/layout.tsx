import AuthSessionGuard from "@/libs/auth/AuthSessionGuard";
import SidebarWrapper from "./sidebarWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-3xl 3xl:container flex">
      <AuthSessionGuard>
        <SidebarWrapper />
        <main className="h-screen w-full overflow-y-auto p-8">{children}</main>
      </AuthSessionGuard>
    </div>
  );
}
