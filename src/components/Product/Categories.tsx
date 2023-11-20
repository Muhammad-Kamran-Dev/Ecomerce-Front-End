"use client";

import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import { updateCategoryChecked } from "@/redux/features/product/productFilterSlice";
import { RootState } from "@/redux/libs/store";

const Categories = () => {
  const dispatch = useAppDispatch();

  // Get the info from the redux store
  const data = useAppSelector((state: RootState) => state.productFilter);
  const { categoryChecked } = data;
  const { categories } = data;

  // Function to handle category checkbox changes
  const handleCategory = (e: CheckedState, categoryValue: string) => {
    // If the categoryValue is in categoryChecked, update the checked value
    const updatedCategoryChecked = categoryChecked.map((category) => {
      if (category.name === categoryValue) {
        return {
          ...category,
          checked: !category.checked,
        };
      }
      return category;
    });

    // If the categoryValue is not in categoryChecked, add it with checked: false
    if (
      !updatedCategoryChecked.some(
        (category) => category.name === categoryValue
      )
    ) {
      updatedCategoryChecked.push({
        name: categoryValue,
        checked: true,
      });
    }
    dispatch(updateCategoryChecked(updatedCategoryChecked));
  };

  return (
    <Box marginTop={5}>
      <h2 className="my-5 font-bold">Select a Category</h2>
      {categories.length > 0 &&
        categories.map((category) => (
          <div className="flex items-center my-2 space-x-2" key={category}>
            <Checkbox
              id={`category-${category}`}
              checked={
                categoryChecked.find((c) => c.name === category)?.checked ||
                false
              }
              onCheckedChange={(e) => handleCategory(e, category)}
            />
            <label
              htmlFor={`category-${category}`}
              className="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category}
            </label>
          </div>
        ))}
    </Box>
  );
};

export default Categories;
