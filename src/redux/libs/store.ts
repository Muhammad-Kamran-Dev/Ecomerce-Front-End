import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailReducer,
  ProductFilterReducer,
  AuthenticationReducer,
  reviewReducer,
  cartReducer,
} from "@/redux/features";

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    product: productReducer,
    productDetail: productDetailReducer,
    productFilter: ProductFilterReducer,
    review: reviewReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
