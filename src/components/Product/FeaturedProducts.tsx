"use client";

import Product from "@/components/Product/Product";
import type { RootState } from "@/redux/libs/store";
import Loading from "../Shared/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import { useEffect } from "react";
import { getProducts } from "@/redux/features/product/productSlice";

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  const { products, loading } = useAppSelector(
    (state: RootState) => state.product
  );

  return loading ? (
    <Loading />
  ) : (
    <>
      <h2 className="w-full h-full m-auto my-20 text-3xl font-bold text-center">
        {Array.isArray(products) && products.length > 0
          ? "Featured Products"
          : "No Products Found"}
      </h2>
      <section
        className="grid w-11/12 grid-cols-1 mx-auto my-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-20 gap-x-10 "
        id="featureProducts"
      >
        {Array.isArray(products) &&
          products.length > 0 &&
          products.map((product) => (
            <Product key={product._id} product={product} priority />
          ))}
      </section>
    </>
  );
};

export default FeaturedProducts;
