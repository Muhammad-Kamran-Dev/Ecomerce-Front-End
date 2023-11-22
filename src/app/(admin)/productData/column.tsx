"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  amount: number;
  rating: number;
  category: string;
  stock: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Product Id",
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "stock",
    header: "Stock",
  },
];
