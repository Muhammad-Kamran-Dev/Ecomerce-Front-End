import { ReviewsType } from "../Reviews/reviews";

export type ImageType = {
  public_id: string;
  url: string;
};

export type ProductType = {
  _id: number;
  name: string;
  description: string[];
  price: number;
  ratings: number;
  images: ImageType[];
  category: string;
  stock: number;
  numOfReviews: number;
  user: number;
  reviews: ReviewsType[];
  createdAt: number;
};

// store product types
export interface ProductStateType {
  products: ProductType[];
  totalProducts: number;
  results: number;
  loading: boolean;
  error: string | null | undefined | unknown;
}

export type GetProductsType = {
  keyword?: string;
  currentPage?: number;
  price?: number[];
  ratings?: number;
  categories?: string[];
};

export type CategoryCheckedType = {
  name?: string;
  checked?: boolean;
};

// Define a type for the slice Product Filter
export type productFilterType = {
  loading: boolean;
  error: string | null | undefined | unknown;
  currentPage: number;
  categories: string[];
  categoryChecked: CategoryCheckedType[];
  ratings: number;
  price: number[];
};

// Product Detail Types
export type ProductDetailStateType = {
  ProductDetails?: ProductType;
  loading: boolean;
  error: string | null | undefined | unknown;
};

// cart types
export type CartStateType = {
  product: ProductType;
  quantity: number;
};
