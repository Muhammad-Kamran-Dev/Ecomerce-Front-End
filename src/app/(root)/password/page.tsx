"use client";

import { Protected } from "@/components";
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
import UserService from "@/services/userService";
import { ChangePasswordSchema, ChangePasswordType } from "@/validator/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineUnlock } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
const UpdatePassword = () => {
  const router = useRouter();
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ChangePasswordType) {
    const res = await UserService.updatePassword(values);
    if (res.status === 200) {
      toast.success("Password Updated Successfully");
      router.push("/profile");
    }
  }

  return (
    <div className="px-5 w-full md:w-1/2 mx-auto my-10 min-h-screen  flex flex-col items-center gap-10">
      <h1 className="text-xl">Update Your Password</h1>
      <Form {...form}>
        <form
          method="POST"
          className="space-y-4   w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Current Password</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md">
                    <AiOutlineUnlock />
                    <Input
                      type="password"
                      placeholder="Enter Your Current Password"
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Enter Password</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md">
                    <RiLockPasswordFill />
                    <Input
                      type="password"
                      placeholder="Enter New Password"
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
                <FormLabel className="text-base">Confirm Password</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2 pl-3 border-2 rounded-md">
                    <RiLockPasswordFill />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
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
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Protected(UpdatePassword);
