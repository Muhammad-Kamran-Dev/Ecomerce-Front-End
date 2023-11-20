"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductService from "@/services/productService";
import { isArrayOfString } from "@/utils/isArrayOfString";
import { useEffect, useState } from "react";

type SelectCategoryProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isCategoryEmpty: boolean;
  setIsCategoryEmpty: React.Dispatch<React.SetStateAction<boolean>>;
};
const SelectCategory = ({
  category,
  setCategory,
  isCategoryEmpty,
  setIsCategoryEmpty,
}: SelectCategoryProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getProductCategories = async () => {
      const response = await ProductService.getProductCategories();

      if (response.status === 200) {
        if (isArrayOfString(response.data.categories)) {
          setCategories(response.data.categories);
        }
      }
    };
    getProductCategories();
  }, []);

  const onChangeHandler = (value: string) => {
    setIsCategoryEmpty(false);
    setCategory(value);
  };

  return categories.length < 0 ? (
    <h1>Loading ... </h1>
  ) : (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="mb-2">
        Category
      </label>
      <Select onValueChange={onChangeHandler} defaultValue={category}>
        <SelectTrigger className="w-full " id="category">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="capitalize">
            {categories.map((category) => (
              <SelectItem key={category.toString()} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isCategoryEmpty && (
        <em className="block text-red-500 font-semibold text-sm my-2">
          Select a category
        </em>
      )}
    </div>
  );
};

export default SelectCategory;
