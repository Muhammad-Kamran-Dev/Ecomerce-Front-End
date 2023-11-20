import conf from "@/conf";
import axios from "axios";

export const getPriceInfo = async () => {
  try {
   const response = await axios.get(`${conf.baseUrl}/products/priceInfo`);
  return response.data;
  } catch (error) {
    return null;
  }
};

// Return all categories
export const getAllCategories = async () => {
  const response = await axios.get(`${conf.baseUrl}/products/categories`);
  return response.data;
};
