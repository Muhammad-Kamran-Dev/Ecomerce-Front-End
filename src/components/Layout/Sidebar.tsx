"use client";

import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import ReactStars from "react-rating-star-with-type";
import { Categories } from "..";
import { getAllCategories, getPriceInfo } from "@/utils/productInfoHelper";
import {
  updateCategories,
  updateCategoryChecked,
  updateCurrentPage,
  updateprice,
  updateRatings,
} from "@/redux/features/product/productFilterSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/libs/store";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [priceInfo, setPriceInfo] = useState({ minPrice: 0, maxPrice: 25000 });
  // Get the info from the redux store
  const {
    ratings,
    categoryChecked,
    price: value,
  } = useAppSelector((state: RootState) => state.productFilter);

  const options = {
    count: 5,
    isEdit: true,
    isHalf: true,
    value: ratings,
    size: 20,
    activeColor: "#FFA41C",
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getAllCategories();
      dispatch(updateCategories(data.categories));

      const priceData = await getPriceInfo();
      if (priceData) {
        setPriceInfo({
          minPrice: priceData.minPrice,
          maxPrice: priceData.maxPrice,
        });
      }
    };
    getData();
    const categories: (string | null | undefined)[] = categoryChecked.map(
      (category) => (category.checked ? category.name : null)
    );
    const filterCategories = categories.filter((category) => category);

    dispatch(
      getProducts({
        price: value,
        ratings: ratings,
        categories: filterCategories as string[],
      })
    );
  }, [value, ratings, dispatch, categoryChecked]);

  function valuetext(value: number) {
    return `${value}Rs.`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch(updateprice(newValue as number[]));
  };

  const clearFilter = () => {
    dispatch(updateCategoryChecked([{}]));
    dispatch(updateCurrentPage(1));
    dispatch(updateprice([0, 25000]));
    dispatch(updateRatings(0));
    router.replace("/products", undefined);
  };
  return (
    <>
      <p className="w-full p-5 text-xl font-bold text-white bg-orange-500 md:hidden">
        Filter here
      </p>
      <article className="flex-col hidden gap-10 md:flex ">
        <Box marginTop={5}>
          <h2 className="my-10 font-bold">Select Price Range</h2>
          <Box width={200}>
            <Slider
              getAriaLabel={() => "Products Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={priceInfo.minPrice}
              max={priceInfo.maxPrice}
              content="Products Price range"
            />
          </Box>
        </Box>
        <Box marginTop={1}>
          <h2 className="my-4 font-bold">Select Rating</h2>
          <Box width={200}>
            {ratings < 1 ? (
              <>
                <h1 className="hidden"></h1>
                <ReactStars
                  {...options}
                  value={0}
                  onChange={(rating) =>
                    rating < 1
                      ? dispatch(updateRatings(Math.floor(rating)))
                      : dispatch(updateRatings(rating))
                  }
                />
              </>
            ) : (
              <ReactStars
                {...options}
                onChange={(rating) =>
                  rating < 1
                    ? dispatch(updateRatings(Math.floor(rating)))
                    : dispatch(updateRatings(rating))
                }
              />
            )}
          </Box>
        </Box>

        {/* Categories Component */}
        <Categories />

        <Stack spacing={2} direction="row" classes={"bg-black p-5"}>
          <Button
            className="w-full bg-blue-700 hover:bg-blue-800"
            onClick={clearFilter}
          >
            Clear Filter
          </Button>
        </Stack>
      </article>
    </>
  );
};

export default Sidebar;
