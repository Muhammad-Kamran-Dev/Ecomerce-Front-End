import Image from "next/image";
import playStore from "@/../public/assets/img/playStore.png";
import appStore from "@/../public/assets/img/appStore.png";
import Link from "next/link";
import logo from "@/../public/assets/svg/logo-white.svg";
const Footer = () => {
  return (
    <footer className="w-full py-3 text-white bg-black/90 ">
      <div className="grid items-center w-11/12 grid-cols-1 py-10 mx-auto lg:grid-cols-3 gap-y-10 lg:gap-y-0 justify-items-center lg:py-5">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-base font-semibold uppercase ">
            Download Our App
          </h3>
          <p className="text-center">
            Download App for Android and ios mobile phone.
          </p>
          <div className="flex flex-col gap-5 my-4 img">
            <Link href="/">
              <Image src={playStore}         
 alt="PlayStore Download" />
            </Link>
            <Link href="/">
              <Image src={appStore}         
 alt="AppStore Download" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Link href="/">
            <Image
              className="w-full h-12 bg-cover cursor-pointer "
              src={logo}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

              alt="Ecommerce Logo"
            />
          </Link>
          <h2 className="text-5xl font-bold text-orange-500 my-7">
            <Link
              className="relative transition-colors duration-300 ease-in hover:text-orange-200"
              href="/"
            >
              Ecommerce.
            </Link>
          </h2>
          <div className="flex flex-col items-center gap-2 text-sm">
            <p>High Quality is my first Priority</p>
            <p>© 2023 Ecommerce. All rights reserved.</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 ">
          <h3 className="mb-5 font-bold">
            <Link
              className="relative underline transition-colors duration-300 ease-in hover:text-orange-500"
              href="/"
            >
              Follow Us
            </Link>
          </h3>
          <Link
            className="relative transition-colors duration-300 ease-in hover:text-orange-500"
            href="/"
          >
            Instagram
          </Link>
          <Link
            className="relative transition-colors duration-300 ease-in hover:text-orange-500"
            href="/"
          >
            Youtube
          </Link>
          <Link
            className="relative transition-colors duration-300 ease-in hover:text-orange-500"
            href="/"
          >
            Facebook
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
{
}
