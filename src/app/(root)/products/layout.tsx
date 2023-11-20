"use client";

import Sidebar from "@/components/Layout/Sidebar";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Conditionally render the layout based on the page
  const isProductPage = pathname === "/products";

  // basically i want to show the sidebar only on the products page
  return !isProductPage ? (
    <>{children}</>
  ) : (
    <section className="flex flex-col w-full gap-10 mx-auto md:w-11/12 md:flex-row ">
      <Sidebar />
      {children}
    </section>
  );
};
export default Layout;
