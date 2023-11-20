import { ReviewStateType } from "@/types/Reviews/reviews";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all Products from api using axios
export const getReview = createAsyncThunk(
  "review/getReview",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/review?id=${id}`
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);

// Define the initial state using that type
const initialState: ReviewStateType = {
  ratings: 0,
  reviews: [],
  totalReviews: 0,
  error: false,
  loading: true,
  productName: "",
  productImg: "",
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReview.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews;
      state.ratings = action.payload.ratings;
      state.productName = action.payload.productName;
      state.totalReviews = action.payload.totalReviews;
      state.productImg = action.payload.productImg;

      state.error = false;
      state.loading = false;
    });
    builder.addCase(getReview.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
      state.reviews = [];
      state.ratings = 0;
      state.productName = "";
      state.totalReviews = 0;
      state.productImg = "";
    });
  },
  reducers: {},
});

export const reviewSelector = (state: ReviewStateType) => state.reviews;
export const reviewCount = (state: ReviewStateType) => state.totalReviews;
export const ratings = (state: ReviewStateType) => state.ratings;

export default reviewSlice.reducer;
