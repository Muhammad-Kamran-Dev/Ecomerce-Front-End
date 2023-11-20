import { ProductDetailStateType, ProductType } from "@/types/Products/products";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "@/conf";

// Get Single Product from api using axios
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${conf.baseUrl}/products/${id}`);
      return data.product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Define the initial state using ProductDetailStateType type
const initialState: ProductDetailStateType = {
  error: null,
  loading: true,
};

export const productDetailSlice = createSlice({
  name: "productsDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.ProductDetails = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const productDetailSelector = (state: ProductDetailStateType) =>
  state.ProductDetails;
export default productDetailSlice.reducer;
