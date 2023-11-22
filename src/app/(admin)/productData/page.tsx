"use client";

import ProductService from "@/services/productService";
import { Product, columns } from "./column";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

type ProductResponse = {
  _id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  stock: number;
};

async function getData(): Promise<Product[]> {
  const response = await ProductService.getAllProducts();
  const data = response.data.products;
  const formattedData = data.map((product: ProductResponse) => {
    return {
      id: product._id,
      name: product.name,
      amount: product.price,
      rating: product.rating,
      category: product.category,
      stock: product.stock,
    };
  });

  return formattedData;
}

export default async function Page() {
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const data = await getData();
      setData(data);
    })();
  }, []);

  return (
    data && (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  );
}
