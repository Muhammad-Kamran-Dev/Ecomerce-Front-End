"use client";

import { useAppDispatch } from "@/redux/libs/hooks";
import Image from "next/image";
import {
  CartItemType,
  addToCart,
  decrementProductQuantity,
  removeItemFromCart,
} from "@/redux/features/cart/CartSlice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types/Products/products";
import { useToast } from "@/components/ui/use-toast";
import { IoCloseSharp } from "react-icons/io5";
import ProductService from "@/services/productService";

type CartItemProps = {
  productItem: CartItemType;
};

const CartItem = ({ productItem }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [productOrderCount, setProductOrderCount] = useState(0);
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    const getProduct = async () => {
      const response = await ProductService.getProduct(productItem._id);
      if (response.status === 200) {
        setProduct(response.data.product);
      }
      setProductOrderCount(productItem.quantity);
    };
    getProduct();
  }, [productItem.quantity, productItem._id]);

  const handleProductOrderIncrement = () => {
    if (product && productOrderCount + 1 <= product.stock) {
      setProductOrderCount(productOrderCount + 1);
      dispatch(addToCart({ product, quantity: 1 }));
    } else {
      toast({
        variant: "destructive",
        title: "Stock Limit Reached",
        description: `You can't add more than the ${product?.stock} items}`,
      });
    }
  };

  const handleProductOrderDecrement = () => {
    if (productOrderCount - 1 >= 1) {
      setProductOrderCount(productOrderCount - 1);
      dispatch(decrementProductQuantity(productItem._id));
    } else {
      dispatch(removeItemFromCart(productItem._id));
    }
  };

  const handleClick = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="flex gap-5 w-full justify-between ">
      <div className="w-52 aspect-square relative shrink-0">
        <Image
          src={productItem.image}
          alt={productItem.title}
          className="rounded-xl"
          fill
        />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-5 ">
        <div className="flex justify-between">
          <p className="text-xl font-bold ">₨ : {productItem.price}</p>

          <div
            className="cursor-pointer "
            onClick={() => handleClick(productItem._id)}
          >
            <IoCloseSharp className="w-6 h-6 " />
          </div>
        </div>

        <p className="text-sm font-semibold ">{productItem.title}</p>
        <div className="hidden md:block">
          <h2 className=" font-semibold text-black">About this item</h2>
          <ul className="my-3  px-4 ">
            {productItem.description.map(
              (desc, index) =>
                index < 3 && (
                  <li
                    key={index}
                    className="text-sm leading-relaxed text-gray-600 list-disc "
                  >
                    {desc}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center ">
            <Button
              className="p-2 text-white bg-black/70"
              onClick={handleProductOrderDecrement}
            >
              -
            </Button>
            <p
              className="w-20 text-center border-0 focus:ring-0
              focus-visible:ring-0 focus-visible:ring-offset-0 "
            >
              {productOrderCount}
            </p>
            <Button
              className="p-2 text-white bg-black/70"
              onClick={handleProductOrderIncrement}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
