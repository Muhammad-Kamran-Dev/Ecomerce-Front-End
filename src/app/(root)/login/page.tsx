"use client";

import AccountLoading from "@/components/Auth/AccountLoading";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";
import { loadUser } from "@/redux/features/Auth/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Account = () => {
  const [accountLoading, setAccountLoading] = useState(false);
  const [switchTab, setSwitchTab] = useState<"login" | "signup">("login");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.authentication
  );
  useEffect(() => {
    const cookieAvailable = Cookies.get("LogedIn");

    if (cookieAvailable && !isAuthenticated) {
      dispatch(loadUser());
    }

    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router, dispatch]);

  return accountLoading ? (
    <AccountLoading />
  ) : (
    <div className="w-full h-full py-5">
      <div className="w-full py-5 mx-auto rounded-lg shadow-2xl md:w-1/2 xl:w-1/3 ">
        <div className="grid grid-cols-2 mb-5 gap-x-5">
          <div className="relative overflow-hidden">
            <button
              className={`p-5 text-center w-full ${
                switchTab === "login" && "animated-border"
              } uppercase`}
              onClick={() => setSwitchTab("login")}
            >
              login
            </button>
          </div>
          <div className="relative overflow-hidden">
            <button
              className={`p-5 text-center w-full  ${
                switchTab === "signup" && "animated-border"
              } uppercase`}
              onClick={() => setSwitchTab("signup")}
            >
              Register
            </button>
          </div>
        </div>

        {/* Both Forms */}
        <div className="relative w-full h-full overflow-hidden">
          <LoginForm switchTab={switchTab} />
          <SignupForm
            switchTab={switchTab}
            setAccountLoading={setAccountLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
