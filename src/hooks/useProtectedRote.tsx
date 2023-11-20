import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import {
  loadUser,
  logoutUser,
} from "@/redux/features/Auth/AuthenticationSlice";

export function useProtectedRoute() {
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

  return showComponent;
}
