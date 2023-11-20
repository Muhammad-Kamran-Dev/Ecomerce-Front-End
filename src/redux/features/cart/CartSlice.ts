import { createSlice } from "@reduxjs/toolkit";

export type CartItemType = {
  _id: string;
  title: string;
  description: string[];
  price: number;
  image: string;
  category: string;
  quantity: number;
};

type initialStateType = {
  cart: CartItemType[];
};

const initialState: initialStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload.product;
      const quantity = action.payload.quantity && action.payload.quantity;

      const isItemExist = state.cart?.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart?.map((i) =>
          i._id === item._id
            ? {
                ...isItemExist,
                quantity: quantity
                  ? isItemExist.quantity + quantity
                  : isItemExist.quantity + 1,
              }
            : i
        );
      } else {
        state.cart?.push({
          _id: item._id,
          title: item.name,
          description: item.description,
          price: item.price,
          image: item.images[0].url,
          category: item.category,
          quantity: quantity ? quantity : 1,
        });
      }
    },
    decrementProductQuantity(state, action) {
      const id = action.payload;
      const isItemExist = state.cart?.find(
        (i) => i._id.toString() === id.toString()
      );

      if (isItemExist && isItemExist.quantity > 1) {
        state.cart = state.cart?.map((i) =>
          i._id === id
            ? {
                ...isItemExist,
                quantity: isItemExist.quantity - 1,
              }
            : i
        );
      }
    },
    removeItemFromCart(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeItemFromCart,
  decrementProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
