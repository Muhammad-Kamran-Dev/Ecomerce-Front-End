import { userType } from "../Auth/authentication";

export type ReviewsType = {
  _id: number;
  name: string;
  rating: number;
  comment: string;
  user: userType;
  createdAt: number;
};

export type ImageType = {
  public_id: string;
  url: string;
};

export type ReviewStateType = {
  reviews: ReviewsType[];
  ratings: number;
  totalReviews: number;
  productName: string;
  productImg: string;
  error: boolean;
  loading: boolean;
};
