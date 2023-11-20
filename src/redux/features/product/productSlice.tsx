import conf from "@/conf";
import { GetProductsType, ProductStateType } from "@/types/Products/products";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all Products from api using axios
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    {
      keyword = "",
      currentPage = 1,
      price = [0, 2000000],
      ratings = 0,
      categories = [],
    }: GetProductsType,
    thunkAPI
  ) => {
    try {
      const filterCategories = categories.join(",");

      let url = `${conf.baseUrl}/products?${
        keyword && `keyword=${keyword}`
      }&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${
        price[1]
      }&ratings=${ratings}${
        categories.length > 0 ? `&categories=${filterCategories}` : ""
      }`;

      const { data } = await axios.get(url!);

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Define the initial state using ProductState type
const initialState: ProductStateType = {
  products: [],
  results: 0,
  totalProducts: 0,
  error: null,
  loading: true,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.results = action.payload.results;
      state.totalProducts = action.payload.totalProducts;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
  reducers: {},
});

export const productSelector = (state: ProductStateType) => state.products;
export default productSlice.reducer;
