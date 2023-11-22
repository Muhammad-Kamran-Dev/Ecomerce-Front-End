"use client";

import OrderService from "@/services/orderService";
import ProductService from "@/services/productService";
import UserService from "@/services/userService";
import { useEffect, useState } from "react";
import UserNav from "./_components/Overview";
import RecentSales from "./_components/RecentSales";

type dashboardDataT = {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<dashboardDataT>();
  useEffect(() => {
    (async () => {
      const usersResponse = await UserService.getAllUsers();
      const productsResponse = await ProductService.getAllProducts();
      const ordersResponse = await OrderService.getAllOrders();

      const users = usersResponse.data.totalUsers;
      const products = productsResponse.data.results;
      const orders = ordersResponse.data.totalAmount;

      setDashboardData({
        totalUsers: users,
        totalOrders: orders,
        totalProducts: products,
      });
    })();
  }, []);
  return (
    <div className="flex flex-col flex-1 min-h-screen overflow-y-auto bg-gray-100 p-5">
      <div className="container mx-auto my-5">
        <h1 className="text-2xl font-semibold">All Products Info</h1>
      </div>

      {/* Main Content */}
      <div className="container flex-grow mx-auto mt-8 px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard Cards */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">{dashboardData?.totalUsers}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Products</h2>
            <p className="text-3xl font-bold">{dashboardData?.totalProducts}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold">{dashboardData?.totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-10 sm:mt-20 ">
        <div className="border border-black/10 shadow-lg p-2 sm:p-5 rounded-md ">
          <div>
            <h2 className="text-2xl font-bold  mb-20">Overview</h2>
          </div>
          <UserNav />
        </div>
        <div className="border border-black/10 shadow-lg p-2 sm:p-5 rounded-md">
          <div>
            <h2 className="text-2xl font-bold mb-20">Recent Sales</h2>
          </div>
          <RecentSales />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
