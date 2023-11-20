"use client";

import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import { useEffect } from "react";
import { RootState } from "@/redux/libs/store";
import { getProductDetails } from "@/redux/features/product/productDetailSlice";
import ProductDetail from "@/components/Product/ProductDetail";
import { ProductType } from "@/types/Products/products";
import { notFound } from "next/navigation";
import Loading from "@/components/Shared/Loading";
import Protected from "@/components/AuthLayout/AuthLayout";

type Props = {
  params: {
    id: string;
  };
};

const ProductDetails = ({ params }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  const { error, ProductDetails, loading } = useAppSelector(
    (state: RootState) => state.productDetail
  );

  if (error) {
    notFound();
  }
  return loading ? (
    <Loading />
  ) : (
    <ProductDetail product={ProductDetails as ProductType} priority />
  );
};

export default Protected(ProductDetails);
