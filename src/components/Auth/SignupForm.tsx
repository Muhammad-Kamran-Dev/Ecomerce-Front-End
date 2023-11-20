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
import { MdFace } from "react-icons/md";
import { AiOutlineUnlock, AiOutlineMail } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useAppDispatch } from "@/redux/libs/hooks";
import toast from "react-hot-toast";
import axios from "axios";
import config from "@/conf";
import { setLoginUser } from "@/redux/features/Auth/AuthenticationSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { RegisterFormType, RegisterFormSchema } from "@/validator/auth";

import AuthService from "@/services/authService";

type Props = {
  switchTab: "login" | "signup";
  setAccountLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignupForm = ({ switchTab, setAccountLoading }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>();

  //  For Register Form
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
  });

  const registerImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  async function onSubmit(values: RegisterFormType) {
    const { name, email, password } = values;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar ? avatar.toString() : "");

    setAccountLoading(true);
    const response = await AuthService.signUpUser(formData);
    if (response.status === 201) {
      dispatch(setLoginUser(response.data.user));
      toast.success("User Created Successfully");
      router.push("/");
      Cookies.set("LogedIn", "true");
      setAccountLoading(false);
    } else {
      Cookies.set("LogedIn", "false");
      setAccountLoading(false);
      toast.error(response);
    }
  }
  return (
    <div
      className={`px-5  ${
        switchTab === "signup"
          ? "transform translate-x-0 transition-transform duration-300 ease-in h-full"
          : " transform translate-x-full transition-transform duration-300 ease-out"
      }`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md">
                    <MdFace />
                    <Input
                      placeholder="Enter Your Name"
                      className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:border-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ConfirmPassword</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md ">
                    <AiOutlineUnlock />
                    <Input
                      type="password"
                      placeholder="Confirm Your Password"
                      className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:border-none "
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md focus-visible:ring-1 hover:ring-black ">
                    <CgProfile />
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload Image"
                      className="px-0 border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:border-none file:w-full hover:file:cursor-pointer"
                      {...field}
                      name="avatar"
                      onChange={(event) => {
                        registerImgChange(event);
                        field.onChange(event);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-[#EF4444] hover:bg-[#EF4444]/90">
            Signup
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
