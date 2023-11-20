"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditFormSchema, EditFormType } from "@/validator/profile";
import UserService from "@/services/userService";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import { updateUser } from "@/redux/features/Auth/AuthenticationSlice";
import { RefObject, forwardRef } from "react";

type EditFormProps = {};

const EditForm = forwardRef<HTMLButtonElement, EditFormProps>(function EditForm(
  props,
  ref
) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authentication);
  const form = useForm<EditFormType>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      name: user?.name,
      description: user?.description,
      mobileNo: user?.mobileNo.replace("-", ""),
    },
  });
  const onSubmit = async (values: EditFormType) => {
    const response = await UserService.updateProfile(values);
    if (response.status === 200) {
      const {
        data: { updatedUser },
      } = response;
      dispatch(updateUser(updatedUser));
      if (ref && "current" in ref && ref.current) {
        ref.current?.click();
      }
      return toast.success("Profile Updated Successfully");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Update Your Profile Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobileNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Mobile Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end ">
          Update Profile
        </Button>
      </form>
    </Form>
  );
});

export default EditForm;
