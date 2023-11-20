"use client";
import { ProductType } from "@/types/Products/products";
import Image from "next/image";
import Link from "next/link";
import ReactStars from "react-rating-star-with-type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getFormattedProductName } from "@/utils/formateProductName";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import { addToCart } from "@/redux/features/cart/CartSlice";

type Props = {
  product: ProductType;
  priority?: boolean;
};

const Product = ({ product, priority }: Props) => {
  const { cart } = useAppSelector((state) => state.cart);
  const productInCart = cart.find(
    (item) => item._id.toString() === product._id.toString()
  );
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: ProductType) => {
    if (product.stock > 0) {
      if (productInCart && productInCart.quantity < product.stock) {
        dispatch(addToCart({ product }));
        toast({
          variant: "success",
          title: "Added to Cart",
          description: `${product.name} is added to cart`,
        });
      }
      if (!productInCart) {
        dispatch(addToCart({ product }));
        toast({
          variant: "success",
          title: "Added to Cart",
          description: `${product.name} is added to cart`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Out of Stock",
        description: `${product.name} is out of stock`,
      });
    }
  };

  const options = {
    count: 5,
    isEdit: false,
    isHalf: true,
    value: product.ratings,
    size: 20,
    activeColor: "#FFA41C",
  };

  return (
    <article className="relative flex flex-col justify-between w-full gap-10 text-sm transition-transform duration-300 ease-in shadow-xl hover:transform hover:scale-110 p-7 h-fit group :">
      {product.stock === 0 && (
        <Badge className="absolute top-0 z-10 self-end bg-[#F15656]/90 -right-[5%] w-fit group-hover:bg-[#F15656]">
          Out of Stock
        </Badge>
      )}
      <Link href={`/products/${product._id.toString()}`}>
        <AspectRatio ratio={5 / 6} className=" bg-muted">
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority ? true : false}
            className={`object-contain object-center ${
              product.stock === 0 && "filter grayscale contrast-100"
            } `}
          />
        </AspectRatio>
        <div className="flex flex-col gap-5 mt-3">
          <h2 className="w-full font-sm  font-bold  ">
            {getFormattedProductName(product.name, 70)}
          </h2>
          <h2 className="w-3/4 font-semibold text-orange-500">
            ₨ : {product.price}
          </h2>
          <div className="flex items-end flex-1 rating justify-self-end md:gap-7">
            <ReactStars {...options} />{" "}
            <span className="font-semibold text-black whitespace-nowrap">
              ({product.numOfReviews}){" "}
              {product.numOfReviews > 1 ? "Reviews" : "Review"}
            </span>
          </div>
        </div>
      </Link>

      <Button
        variant="destructive"
        disabled={product.stock === 0}
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </Button>
    </article>
  );
};

export default Product;
