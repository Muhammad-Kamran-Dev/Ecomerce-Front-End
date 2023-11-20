import { productFilterType } from "@/types/Products/products";
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using productFilterType type
const initialState: productFilterType = {
  loading: false,
  error: null,
  currentPage: 1,
  ratings: 0,
  categories: [],
  categoryChecked: [{}],
  price: [0, 2000000],
};

export const ProductFilterSlice = createSlice({
  name: "productsDetails",
  initialState,

  reducers: {
    updateprice: (state, action) => {
      state.currentPage = 1;
      state.price = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateRatings: (state, action) => {
      state.currentPage = 1;
      state.ratings = action.payload;
    },
    updateCategories: (state, action) => {
      state.currentPage = 1;
      state.categories = action.payload;
    },

    updateCategoryChecked: (state, action) => {
      state.currentPage = 1;
      state.categoryChecked = action.payload;
    },
  },
});

export const {
  updateCurrentPage,
  updateRatings,
  updateCategories,
  updateCategoryChecked,
  updateprice,
} = ProductFilterSlice.actions;
export default ProductFilterSlice.reducer;
