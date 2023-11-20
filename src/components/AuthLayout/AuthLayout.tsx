"use client";
/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/router instead of next/navigation
import Cookies from "js-cookie";

import {
  loadUser,
  logoutUser,
} from "@/redux/features/Auth/AuthenticationSlice";
import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";

function Protected(WrappedComponent: React.ComponentType<any>) {
  return (props: any) => {
    const [showComponent, setShowComponent] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isAuthenticated, loading } = useAppSelector(
      (state) => state.authentication
    );

    useEffect(() => {
      const cookieAvailable = Cookies.get("LogedIn");

      if (cookieAvailable && !isAuthenticated) {
        dispatch(loadUser());
      }

      if (!cookieAvailable) {
        dispatch(logoutUser());
      }

      if (isAuthenticated && !loading) {
        setShowComponent(true);
      }

      if (!loading && !isAuthenticated) {
        router.replace("/login");
      }
    }, [loading, isAuthenticated, router, dispatch]);

    return showComponent ? <WrappedComponent {...props} /> : <Loading />;
  };
}

export default Protected;
