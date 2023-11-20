"use client";
import ReviewComponent from "@/components/Review/ReviewComponent";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import ReactStars from "react-rating-star-with-type";
import { Line } from "rc-progress";
import Loading from "../../loading";
import { RootState } from "@/redux/libs/store";
import { getReview } from "@/redux/features/review/reviewSlice";
import Protected from "@/components/AuthLayout/AuthLayout";

type Props = {
  searchParams: {
    id: string;
  };
};

const Reviews = ({ searchParams }: Props) => {
  const { id } = searchParams;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReview(id));
  }, [id, dispatch]);

  const router = useRouter();
  const {
    reviews,
    ratings,
    totalReviews,
    productName,
    productImg,
    error,
    loading,
  } = useAppSelector((state: RootState) => state.review);

  const options = {
    count: 5,
    isEdit: false,
    isHalf: true,
    value: ratings,
    size: 20,
    activeColor: "#FFA41C",
  };

  if (error) {
    notFound();
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center w-full gap-3 p-3 text-base font-bold text-black bg-slate-300 "
      >
        <span className="text-xl text-white">
          <IoChevronBack />
        </span>
        <span className="">
          {productName.split(" ").length > 3
            ? productName.split(" ").slice(0, 3).join(" ")
            : productName}
        </span>
      </button>

      <section className="w-11/12 mx-auto my-10">
        <div className="flex flex-col justify-between gap-10 lg:items-center lg:flex-row">
          {/* Rating and Number of Reviews */}
          <div className="flex flex-col gap-5 ">
            <h1 className="text-xl font-semibold text-black">
              Customer Reviews
            </h1>
            <div className="flex flex-col gap-3 lg:gap-2 ">
              <div className="flex items-center gap-5 font-semibold">
                <ReactStars {...options} />
                <span className="whitespace-nowrap">{ratings} out of 5 </span>
              </div>
              <p className="text-sm font-semibold text-gray-500">
                {totalReviews} global ratings
              </p>
              <div className="flex items-center gap-2 ">
                <Line
                  percent={(100 / 5) * ratings}
                  strokeWidth={4}
                  strokeColor="#FFA41C"
                />
                <p className="text-sm font-bold whitespace-nowrap">Out of 5 </p>
              </div>
            </div>
          </div>

          {/* Product img & name */}
          <div className="flex items-center gap-5 -order-3 lg:-order-none ">
            <div className="relative w-32 aspect-square">
              <Image
                fill
                src={productImg}
                alt={productName}
                className=" rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col gap-1 font-bold">
              <p className="">{productName}</p>
              <p className="text-[#FFA41C]">By Ecommerce</p>
            </div>
          </div>
          {/* Product buy Option*/}
          <div className="flex items-center gap-5 ">
            <div className="p-5 border-2 rounded-lg ">
              <button className="px-5 py-3 bg-yellow-400 rounded-md outline-none">
                See All Buying Options
              </button>
            </div>
          </div>
        </div>

        {/* Review Component */}
        <div className="w-full h-[1px] my-10 bg-gray-700/70" />
        {reviews.length > 0 ? (
          <ReviewComponent reviews={reviews} />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold text-gray-500m-auto">
              No Reviews Yet ...
            </h1>
          </div>
        )}
      </section>
    </>
  );
};

export default Protected(Reviews);
