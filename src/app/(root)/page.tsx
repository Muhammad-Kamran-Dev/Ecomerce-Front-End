"use client";

import { FeaturedProducts, Hero } from "@/components";
import Protected from "@/components/AuthLayout/AuthLayout";
const Home = () => {
  return (
    <main className="">
      <Hero />
      <FeaturedProducts />
    </main>
  );
};

export default Protected(Home);
