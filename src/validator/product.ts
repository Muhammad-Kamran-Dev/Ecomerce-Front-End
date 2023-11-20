import { isContainOnlyNumber } from "@/utils/isContainOnlyNumber";
import z from "zod";

export const ProductSchema = z
  .object({
    name: z
      .string()
      .min(10, "Name should be 10 Character Long ")
      .max(255, "Name should be no Longer than 255 Character "),
    price: z.string().min(1, "Price is required"),
    category: z.string(),
    stock: z.string().min(1, "Stock is required"),
  })
  .refine(
    (data) => {
      return isContainOnlyNumber(data.price);
    },
    {
      message: "Price should be a number",
      path: ["price"],
    }
  )
  .refine(
    (data) => {
      return isContainOnlyNumber(data.stock);
    },
    {
      message: "Stock should be a number",
      path: ["stock"],
    }
  );

export type ProductSchemaType = z.infer<typeof ProductSchema>;
