"use client";

import userIcon from "@/../public/assets/img/userIcon.png";
import Image from "next/image";
import ReactStars from "react-rating-star-with-type";
import date from "date-and-time";
import { ReviewsType } from "@/types/Reviews/reviews";
import { Container, PaginationComponent } from "@/components";
import { useState } from "react";
import { showReviewItems } from "@/utils/showReviewItems";

type Prop = {
  reviews: ReviewsType[];
  pagination?: boolean;
  reviewsPerPage?: number;
};

const formateDate = (str: string) => {
  const validDate = new Date(str);
  const formattedDate = date.format(validDate, "ddd, MMM DD YYYY"); // => 'Fri, Jan 02 2023'
  return formattedDate;
};

const ReviewComponent = ({
  reviews,
  pagination = false,
  reviewsPerPage = 2,
}: Prop) => {
  const options = {
    count: 5,
    isEdit: false,
    isHalf: true,
    size: 20,
    activeColor: "#FFA41C",
  };
  const [page, setPage] = useState(1);

  return (
    <>
      {/* // Reviews to show in the product page */}
      <article className="flex flex-col gap-10 ">
        {reviews.map(
          (review, index) =>
            showReviewItems(index, page, reviewsPerPage, pagination) && (
              <div key={review._id} className="flex flex-col gap-5 ">
                <div className="flex items-center gap-5 ">
                  <div className="relative w-10 h-10 aspect-video">
                    <Image
                      fill
                      className="object-cover bg-top rounded-full"
                      src={review?.user?.avatar.url || userIcon}
                      alt={review._id.toString()}
                    />
                  </div>
                  <p className="font-semi-bold">{review.name}</p>
                </div>
                <div className="flex flex-col gap-3 lg:gap-2">
                  <div className="flex items-center gap-5 font-semibold">
                    <ReactStars {...{ ...options, value: review.rating }} />
                    <span>{review.rating} out of 5 </span>
                  </div>
                </div>
                <p className="font-semibold">{review.comment}</p>
                <p className="font-semibold text-gray-500">
                  {formateDate(review.createdAt.toString())}
                </p>
              </div>
            )
        )}
      </article>

      {pagination && reviews.length > reviewsPerPage && (
        <Container className="my-10">
          <PaginationComponent
            count={reviews.length}
            page={page}
            setPage={setPage}
            resultsPerPage={reviewsPerPage}
          />
        </Container>
      )}
    </>
  );
};

export default ReviewComponent;
