"use client";
import { ImageType, ProductType } from "@/types/Products/products";
import ReactStars from "react-rating-star-with-type";
import Link from "next/link";
import ReviewComponent from "../Review/ReviewComponent";
import ReactImageGallery from "react-image-gallery";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/features/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";

type Props = {
  product: ProductType;
  priority?: boolean;
};

const getImages = (images: ImageType[], altText: string) => {
  return images.map((image: any) => ({
    original: image.url,
    thumbnail: image.url,
    originalAlt: altText,
    thumbnailAlt: altText,
    originalClass: "pl-2 border-none",
  }));
};

const ProductDetail = ({ product }: Props) => {
  const { toast } = useToast();
  const [productOrderCount, setProductOrderCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const options = {
    count: 5,
    isEdit: false,
    isHalf: true,
    value: product.ratings,
    size: 20,
    activeColor: "#FFA41C",
  };

  const handleAddToCart = (product: ProductType) => {
    if (productOrderCount === 0)
      return toast({
        variant: "destructive",
        title: `Please add at Least one item to cart to proceed`,
      });

    if (productOrderCount > product.stock)
      return toast({
        variant: "destructive",
        title: `Only ${product.stock} items are available in stock`,
        description: `You can't add ${product.name} more than (${
          product.stock
        } ${product.stock > 1 ? "items " : "item"}) in cart`,
      });

    // Logic to add product to cart redux store
    const productInCart = cart.find(
      (item) => item._id.toString() === product._id.toString()
    );

    // if product is already in cart then check if the quantity is less than or equal to the stock
    if (productInCart) {
      if (
        productInCart?.quantity >= product.stock ||
        productInCart?.quantity + productOrderCount > product.stock
      )
        return toast({
          variant: "destructive",
          title: `Only ${product.stock} items are available in stock`,
          description: `You can't add ${product.name} more than (${
            product.stock
          } ${product.stock > 1 ? "items " : "item"}) in cart`,
        });
    }

    dispatch(addToCart({ product, quantity: productOrderCount }));
    return toast({
      variant: "success",
      title: `${product.name} to Cart Successfully`,
    });
  };

  const handleProductOrderIncrement = () => {
    if (product.stock === 0) {
      return toast({
        variant: "destructive",
        title: `${product.name} is out of stock. Please try again later`,
      });
    }

    if (productOrderCount <= product.stock - 1) {
      setProductOrderCount((prv) => prv + 1);
    } else {
      toast({
        variant: "destructive",
        title: `Only ${product.stock} items are available in stock`,
        description: `You can't add ${product.name} more than (${
          product.stock
        } ${product.stock > 1 ? "items " : "item"}) in cart`,
      });
    }
  };

  const handleProductOrderDecrement = () => {
    product.stock > 0 && productOrderCount > 0
      ? setProductOrderCount(productOrderCount - 1)
      : setProductOrderCount(0);
  };

  return (
    <section className="w-11/12 mx-auto my-20">
      <article className="grid text-xl gird-cols-1 gap-y-20 lg:grid-cols-7 gap-x-32">
        <div className="lg:col-start-1 lg:col-end-4 ">
          <ReactImageGallery
            infinite={true}
            showNav={false}
            showBullets={true}
            showThumbnails={true}
            slideInterval={2000}
            showPlayButton={false}
            showFullscreenButton={true}
            thumbnailPosition="left"
            items={getImages(product.images, product.name)}
            slideOnThumbnailOver={true}
            autoPlay={true}
          />
        </div>
        <div className="flex flex-col gap-4 lg:col-start-4 lg:col-end-8">
          <div className="flex flex-col gap-2">
            <h1 className="mt-10 text-xl font-bold">{product.name}</h1>
            <p className="text-xs text-gray-500">ProductId # {product._id}</p>
          </div>
          <Link
            href={`/reviews?id=${product._id}`}
            className="flex items-center gap-5 text-base rating "
          >
            <ReactStars {...options} />

            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
              <span>{product.numOfReviews}</span>
              <span>({product.numOfReviews > 1 ? " review" : " reviews"})</span>
            </div>
          </Link>
          <div className="w-full h-2 border-b-2 rounded-2xl" />

          <div className="flex flex-col gap-5 ">
            <span className="text-base font-bold">₨ : {product.price}</span>

            {/* count Update and add to Cart */}
            <div className="flex items-center gap-5">
              <div className="flex items-center ">
                <Button
                  className="p-2 text-white bg-black/70"
                  onClick={handleProductOrderDecrement}
                  disabled={product.stock === 0}
                >
                  -
                </Button>

                <Input
                  className="w-20 text-center border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                  type="number"
                  disabled={productOrderCount > product.stock}
                  min={1}
                  max={product.stock}
                  value={productOrderCount}
                  onChange={(e) => {
                    Number(e.target.value) <= product.stock
                      ? setProductOrderCount(Number(e.target.value))
                      : toast({
                          variant: "destructive",
                          title: `Only ${product.stock} items are available in stock`,
                          description: `You can't add ${
                            product.name
                          } more than (${product.stock} ${
                            product.stock > 1 ? "items " : "item"
                          }) in cart`,
                        });
                  }}
                  placeholder="1"
                />
                <Button
                  className="p-2 text-white bg-black/70"
                  onClick={handleProductOrderIncrement}
                  disabled={product.stock === 0}
                >
                  +
                </Button>
              </div>
              {/* add to cart button */}
              <Button
                disabled={product.stock === 0}
                onClick={() => handleAddToCart(product)}
                variant="destructive"
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="w-full h-2 border-b-2 rounded-2xl" />
          {/* Stock Status Section */}

          <div className="">
            Status:{" "}
            <span
              className={`${
                product.stock > 0 ? "text-green-500" : "text-[#F15656]"
              } font-bold`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}{" "}
            </span>
          </div>
          <div className="w-full h-2 border-b-2 rounded-2xl" />
          <div className="mx-5 xl:mx-0">
            <h2 className="my-3 font-semibold text-black">About this item</h2>
            <ul className="">
              {product.description.map((desc, index) => (
                <li
                  key={index}
                  className="text-base leading-relaxed text-gray-600 list-disc "
                >
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <div className="my-20">
        <h1 className="text-3xl font-bold">Customer Reviews</h1>

        {/* Review Component */}
        <div className="w-full h-[1px] my-10 bg-gray-700/70" />
        {product.reviews.length > 0 ? (
          <ReviewComponent reviews={product.reviews} pagination />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold text-gray-500m-auto">
              No Reviews Yet ...
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
