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
import { ForgetPasswordSchema, ForgetPasswordType } from "@/validator/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import UserService from "@/services/userService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const ForgetPassword = () => {
  const router = useRouter();
  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgetPasswordType) {
    try {
      const res = await UserService.forgetPassword(values);
      if (res.status === 200) {
        toast.success("Password Reset Link Send to Your Email");
        router.push("/login");
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("Email Not Found");
      }
    }
  }

  return (
    <div className="px-5 w-full md:w-1/2 mx-auto my-10 min-h-screen  flex flex-col items-center gap-10">
      <h1 className="text-xl">Forget Your Password </h1>
      <Form {...form}>
        <form
          method="POST"
          className="space-y-4   w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md">
                    <AiOutlineMail />
                    <Input
                      placeholder="Enter Your Email"
                      className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:border-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-[#EF4444] hover:bg-[#EF4444]/90">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPassword;
