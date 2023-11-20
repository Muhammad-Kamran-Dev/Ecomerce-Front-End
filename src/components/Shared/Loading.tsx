"use client";
import Lottie from "lottie-react";
import animationData from "@/constants/lottie/loading.json";

const Loading = () => {
  return (
    <div className="grid w-screen h-screen place-items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loading;
