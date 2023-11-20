"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/assets/svg/logo.svg";
import { navLinks } from "@/constants";
import { useAppSelector } from "@/redux/libs/hooks";
import { useRouter } from "next/navigation";
import { UserMenu } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideMenu } from "lucide-react";
import { useRef } from "react";
import animationData from "@/constants/lottie/cart.json";

import Lottie from "lottie-react";
export const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.authentication
  );
  const handleLogin = () => {
    router.push("/login");
  };
  const { cart } = useAppSelector((state) => state.cart);

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

          {/* Mobile Navigation */}
          <MobileNavigation handleLogin={handleLogin} />

          {/* For Desktop Navigation */}
          <nav className="hidden gap-10 md:flex">
            <ul className="flex items-center justify-center gap-4 font-bold text-1xl ">
              {navLinks.map((link) => (
                <li
                  key={link.title}
                  className="relative transition-colors duration-300 ease-in hover:text-orange-500 whitespace-nowrap"
                >
                  <Link href={link.path} className="">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

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
                <div className="flex gap-6 items-center ">
                  <Link
                    href="/cart"
                    className={`cursor-pointer  ${
                      cart.length > 0 ? "block" : "hidden"
                    } `}
                  >
                    <div className="h-6 w-6 relative">
                      <Lottie
                        animationData={animationData}
                        loop={true}
                        className="h-6-w-6"
                      />
                      <span className="bg-[#EF4444] absolute top-0 -right-1/2  -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-white">
                        {cart.length}
                      </span>
                    </div>
                  </Link>
                  <UserMenu />
                </div>
              ))}
          </nav>
        </div>
      </header>
    </>
  );
};

type MobileNavigationProps = {
  handleLogin: () => void;
};

const MobileNavigation = ({ handleLogin }: MobileNavigationProps) => {
  const closeNavRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.authentication
  );
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex gap-6 items-center ">
            <Link
              href="/cart"
              className={`cursor-pointer  ${
                cart.length > 0 ? "block" : "hidden"
              } `}
            >
              <div className="h-6 w-6 relative">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="h-6-w-6"
                />
                <span className="bg-[#EF4444] absolute top-0 -right-1/2  -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-white">
                  {cart.length}
                </span>
              </div>
            </Link>
            <LucideMenu className="cursor-pointer" />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="grid gap-4 py-4">
            <ul className="flex flex-col items-center justify-center gap-10 text-4xl font-bold ">
              {navLinks.map((link) => (
                <li
                  key={link.title}
                  className="relative transition-colors duration-300 ease-in hover:text-orange-500"
                  onClick={() => closeNavRef.current?.click()}
                >
                  <Link href={link.path} className="">
                    {link.title}
                  </Link>
                </li>
              ))}

              <SheetClose asChild ref={closeNavRef}>
                <Button className="hidden"></Button>
              </SheetClose>
              <div className="absolute top-5 left-5">
                {!loading &&
                  (!isAuthenticated ? (
                    <Button
                      className={`font-bold `}
                      variant="destructive"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  ) : (
                    <UserMenu />
                  ))}
              </div>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Navbar;
