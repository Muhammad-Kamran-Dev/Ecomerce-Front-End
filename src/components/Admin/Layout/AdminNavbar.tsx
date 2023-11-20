"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/assets/svg/logo.svg";
import { useAppSelector } from "@/redux/libs/hooks";
import Button from "@/components/Shared/Button";
import { useRouter } from "next/navigation";
import { UserMenu } from "@/components";

export const AdminNavbar = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.authentication
  );

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <header className="shadow-md margin-bottom gradient-dark ">
        <div className="flex items-center justify-between w-11/12 py-3 mx-auto ">
          <div className="">
            <Link href="/">
              <Image
                className="w-full h-12 bg-cover cursor-pointer "
                src={logo}
                alt="Ecommerce Logo"
              />
            </Link>
          </div>

          {/* For Desktop Navigation */}
          <nav className=" flex">
            {!loading &&
              (!isAuthenticated ? (
                <Button
                  className={`font-bold`}
                  variant="destructive"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              ) : (
                <UserMenu showName />
              ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default AdminNavbar;
