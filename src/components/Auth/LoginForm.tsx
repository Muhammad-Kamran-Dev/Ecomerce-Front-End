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
import { AiOutlineUnlock, AiOutlineMail } from "react-icons/ai";
import { LoginFormType, LoginForm as Login } from "@/validator/auth";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/libs/hooks";
import { setLoginUser } from "@/redux/features/Auth/AuthenticationSlice";
import { useRouter } from "next/navigation";
import AuthService from "@/services/authService";
import Link from "next/link";

type Props = {
  switchTab: "login" | "signup";
};
// Form Schema for login

const LoginForm = ({ switchTab }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  //  For Login Form
  const form = useForm<LoginFormType>({
    resolver: zodResolver(Login),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormType) {
    const response = await AuthService.loginUser(values);

    if (response.status === 200) {
      toast.success("User Login Successfully");
      Cookies.set("LogedIn", "true");
      dispatch(setLoginUser(response.data.user));
      router.push("/");
    } else {
      toast.error(response);
    }
  }

  return (
    <div
      className={`px-5 absolute top-0 left-0 w-full h-full mt-10  ${
        switchTab === "login"
          ? "transform translate-x-0 transition-transform duration-300 ease-in mt-5"
          : " transform -translate-x-full transition-transform duration-300 ease-out"
      }`}
    >
      <Form {...form}>
        <form
          method="POST"
          className="flex flex-col gap-10 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md">
                    <AiOutlineMail />
                    <Input
                      placeholder="example@example.com"
                      className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:border-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 pl-3 border-2 rounded-md">
                      <AiOutlineUnlock />
                      <Input
                        type="password"
                        placeholder="Enter Your Password"
                        className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:border-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgetPassword"
              className="self-end hover:text-[#EF4444] text-color:[#EF4444]/90 font-semibold transition-colors duration-300 ease-in-out"
            >
              Forgot Password ?
            </Link>
          </div>
          <Button type="submit" className="bg-[#EF4444] hover:bg-[#EF4444]/90">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
