"use client";

import Protected from "@/components/AuthLayout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (url === "") {
      return toast({
        variant: "destructive",
        title: "Please Enter a Product Name to Search",
      });
    }
    router.push(`/products?keyword=${url}`);
  };
  return (
    <>
      <h1 className="mt-20 text-2xl font-semibold text-center">
        Search Products Here{" "}
      </h1>
      <section className="h-[60vh] w-11/12 mx-auto flex flex-col items-center justify-center ">
        <div className="flex w-full gap-10 ">
          <Input
            type="email"
            placeholder="Search Product"
            className="flex-1 p-5"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleSearch} type="submit">
            Search
          </Button>
        </div>
      </section>
    </>
  );
};

export default Protected(Search);
