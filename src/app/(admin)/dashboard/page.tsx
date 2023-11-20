"use client";

import UserService from "@/services/userService";
import { useEffect, useState } from "react";

type userData = {
  totalUsers: number;
};

const Dashboard = () => {
  const [userData, setUserData] = useState<userData>();
  useEffect(() => {
    (async () => {
      const response = await UserService.getAllUsers();
      if (response?.status === 200) setUserData(response.data);
    })();
  }, []);
  return (
    <div className="flex flex-col flex-1 min-h-screen overflow-y-auto bg-gray-100 p-5">
      <div className="container mx-auto my-5">
        <h1 className="text-2xl font-semibold">All Products Info</h1>
      </div>

      {/* Main Content */}
      <div className="container flex-grow mx-auto mt-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard Cards */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">{userData?.totalUsers}</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Revenue</h2>
            <p className="text-3xl font-bold">$0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
