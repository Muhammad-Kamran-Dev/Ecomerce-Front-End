"use client";
import Lottie from "lottie-react";
import animationData from "@/constants/lottie/verifyAccount.json";

const AccountLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full mt-24">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AccountLoading;
