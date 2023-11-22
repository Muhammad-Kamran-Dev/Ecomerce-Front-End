"use client";

import { columns } from "./column";
import { DataTable } from "./data-table";
import { User } from "./column";
import UserService from "@/services/userService";
import { useEffect, useState } from "react";

type UsersResponse = {
  _id: string;
  name: string;
  email: string;
  mobileNo: string;
};

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  const response = await UserService.getAllUsers();
  const data = response.data.users;
  const formattedData = data.map((user: UsersResponse) => {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      mobileNo: user.mobileNo,
    };
  });

  return formattedData;
}

export default function Page() {
  const [data, setData] = useState<User[]>();

  useEffect(() => {
    (async () => {
      const data = await getData();
      setData(data);
    })();
  }, []);

  return (
    data && (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data as User[]} />
      </div>
    )
  );
}
