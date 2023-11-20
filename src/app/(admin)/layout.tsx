"use client";

import {
  Loading,
  Protected,
  DashboardSidebar,
  AdminNavbar,
} from "@/components";
import { useAppSelector } from "@/redux/libs/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.authentication);
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/");
    } else if (user?.role === "admin") {
      setShowComponent(true);
    }
  }, [user, router]);
  return !showComponent ? (
    <Loading />
  ) : (
    <>
      <AdminNavbar />
      <section className="flex w-full min-h-screen ">
        <DashboardSidebar />
        <main className="flex-1 ">{children}</main>
      </section>
    </>
  );
};
export default Protected(Layout);
