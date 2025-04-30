import "../../globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <header></header>
      <section className="max-w-screen-3xl' 3xl:container p-6">
        {children}
      </section>
    </main>
  );
}
