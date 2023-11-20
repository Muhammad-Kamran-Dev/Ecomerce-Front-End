import { Navbar, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
        <Toaster />
      </main>
      <Footer />
    </>
  );
}
