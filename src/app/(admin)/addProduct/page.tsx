"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ChangeEvent, useState } from "react";
import { ProductSchema, ProductSchemaType } from "@/validator/product";
import { isArrayOfString } from "@/utils/isArrayOfString";
import Description from "./_component/Description";
import ProductService from "@/services/productService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SelectCategory from "./_component/SelectCategory";
import ImageCard from "./_component/ImageCard";

const AddProduct = () => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [description, setDescription] = useState<string[]>([]);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState<boolean>(false);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("");
  //  For Register Form
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      stock: "",
    },
  });

  const handleClick = () => {
    console.log("clicked on image ");
  };

  const prepareImgSrc = (
    files: FileList | null
  ): Promise<(string | ArrayBuffer | null)[]> => {
    return new Promise((resolve, reject) => {
      if (!files) {
        reject("No files found");
      } else {
        const imgSrcArray: (string | ArrayBuffer | null)[] = [];

        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2 && reader.result) {
              imgSrcArray.push(reader.result.toString());
              if (imgSrcArray.length === files.length) {
                resolve(imgSrcArray);
              }
            }
          };
          reader.readAsDataURL(files[i] as Blob);
        }
      }
    });
  };

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const images = await prepareImgSrc(event.target.files);

    if (isArrayOfString(images)) {
      setImgSrc(images);
    }
  };

  async function onSubmit(values: ProductSchemaType) {
    if (description.length < 1) return setIsDescriptionEmpty(true);
    if (category === "" || category === undefined)
      return setIsCategoryEmpty(true);

    setIsDescriptionEmpty(false);
    const formData = new FormData();
    const { name, price, stock } = values;

    formData.set("name", name);
    formData.set("category", category);
    formData.set("price", price);
    formData.set("stock", stock);

    description.forEach((desc) => {
      formData.append("description", desc);
    });
    imgSrc.forEach((img) => {
      formData.append("images", img);
    });

    const resp = await ProductService.uploadProduct(formData);
    if (resp.status === 201) {
      form.reset();
      setImgSrc([]);
      setDescription([]);
      setIsDescriptionEmpty(false);
      toast.success("Product Uploaded Successfully");
      return router.push("/productData");
    }
  }

  return (
    <section className="p-5">
      <h1 className="text-2xl text-center">Add Product</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl className=" border-2">
                    <Input placeholder="Enter Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectCategory
              category={category}
              setCategory={setCategory}
              isCategoryEmpty={isCategoryEmpty}
              setIsCategoryEmpty={setIsCategoryEmpty}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl className=" border-2">
                    <Input placeholder="Enter Product Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Description
              description={description}
              setDescription={setDescription}
              isDescriptionEmpty={isDescriptionEmpty}
              setIsDescriptionEmpty={setIsDescriptionEmpty}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Stock</FormLabel>
                  <FormControl className=" border-2">
                    <Input placeholder="Enter Product Stock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image input  */}
            <FormField
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl className=" border-2">
                    <Input
                      placeholder="Upload Images"
                      type="file"
                      multiple
                      {...field}
                      onChange={uploadFileHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Preview */}
            <div className="flex flex-wrap gap-2">
              {imgSrc.map((src, index) => (
                <div key={index}>
                  <ImageCard
                    src={src}
                    alt={`product-${index}`}
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="bg-[#EF4444] hover:bg-[#EF4444]/90"
            >
              Upload Product
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default AddProduct;
