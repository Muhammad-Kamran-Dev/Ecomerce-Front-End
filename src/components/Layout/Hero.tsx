import Link from "next/link";
import { CgScrollV } from "react-icons/cg";

const Hero = () => {
  return (
    <section className="h-[90vh] w-screen hero-bg-gradient   ">
      <div className="flex items-center justify-center h-full ">
        <div className="absolute flex flex-col items-center gap-10 text-white xl:gap-20">
          <h2 className="text-xl">Welcome to Ecommerce</h2>
          <h1 className="text-4xl font-bold leading-snug text-center uppercase lg:text-5xl">
            Find Amazing Products Below
          </h1>
          <Link href="#featureProducts">
            <span className="border-2 shadow-2xl flex gap-5 w-fit p-3 items-center justify-center rounded-lg font-bold hover:bg-[#9c20ee]/30 transition-colors duration-300 ease-in">
              Scroll
              <CgScrollV className="text-4xl animate-bounce" />
            </span>
          </Link>
        </div>

        <div className="w-screen h-full bg-white border-none clip-path"></div>
      </div>
    </section>
  );
};

export default Hero;
