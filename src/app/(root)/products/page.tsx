"use client";

import { Loading, Product, ProductPagination, Protected } from "@/components";

import { getProducts } from "@/redux/features/product/productSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import type { RootState } from "@/redux/libs/store";
import { notFound } from "next/navigation";
type Props = {
  searchParams: {
    keyword: string;
  };
};

const Products = ({ searchParams }: Props) => {
  const { keyword } = searchParams;
  const resultPerPage = 6;
  const dispatch = useAppDispatch();

  const { currentPage, categoryChecked, ratings, price } = useAppSelector(
    (state: RootState) => state.productFilter
  );
  const categories: (string | null | undefined)[] = categoryChecked.map(
    (category) => (category.checked ? category.name : null)
  );
  const filterCategories = categories.filter((category) => category);

  useEffect(() => {
    dispatch(
      getProducts({
        keyword: keyword,
        currentPage: currentPage,
        categories: filterCategories as string[],
        ratings: ratings,
        price: price,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, currentPage, categoryChecked, ratings, price, dispatch]);

  const { error, products, results, loading } = useAppSelector(
    (state: RootState) => state.product
  );

  if (error) {
    notFound();
  }

  // Capitalize the first letter of the keyword
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <h2 className="w-full m-auto my-20 text-3xl font-bold text-center">
        {Array.isArray(products) && products.length > 0
          ? `${
              keyword
                ? `Search Results for ${capitalize(keyword.toString())}`
                : "All Products"
            }`
          : "No Products Found"}
      </h2>
      <section
        className="grid grid-cols-1 my-10 md:grid-cols-2 lg:grid-cols-3  gap-y-20 gap-x-10 "
        id="featureProducts"
      >
        {Array.isArray(products) &&
          products.length > 0 &&
          products.map((product) => (
            <Product key={product._id} product={product} priority />
          ))}
      </section>
      {results > resultPerPage && (
        <ProductPagination
          currentPage={currentPage}
          totalProducts={results}
          resultsPerPage={resultPerPage}
        />
      )}
    </div>
  );
};

export default Protected(Products);
