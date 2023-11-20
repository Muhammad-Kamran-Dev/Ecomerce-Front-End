"use client";
import Lottie from "lottie-react";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import animationDataEmptyCart from "@/constants/lottie/emptyCart.json";
import CartItem from "./_components/CartItem";
import { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/redux/features/cart/CartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setSubtotal(subtotal);
  }, [cart]);

  return cart.length <= 0 ? (
    <div className=" w-full grid place-items-center text-2xl font-bold ">
      <h2 className="text-3xl mt-20 text-center">Nothing in the Cart</h2>
      <Lottie animationData={animationDataEmptyCart} loop={false} />
    </div>
  ) : (
    <div className="  bg-slate-50 text-slate-900 my-10 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  md:w-11/12 mx-auto h-full ">
        <div className="md:col-span-2 bg-white shadow-2xl flex flex-col p-10 w-full h-full  gap-10  max-h-screen overflow-y-auto no-scrollbar bd">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl uppercase font-bold text-black ">My Bag</h2>
            <p className="font-semibold">Items are reserved for 60 minutes</p>
          </div>
          <div className="w-full h-[2px] bg-slate-200 my-5" />

          {cart.map((item) => (
            <div key={item._id}>
              <CartItem productItem={item} />
              <div className="w-full h-[2px] bg-slate-200 my-5" />
            </div>
          ))}
          <div className="flex justify-between">
            <div className="text-xl uppercase font-bold self-end">
              Subtotal : <span>₨ : {subtotal}</span>
            </div>
            <Button
              className="font-bold"
              variant="destructive"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </div>
        </div>
        <div className=" bg-white shadow-2xl">Checkout</div>
      </div>
    </div>
  );
};

export default Cart;
