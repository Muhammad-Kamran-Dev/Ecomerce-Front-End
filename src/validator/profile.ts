import { isContainOnlyNumber } from "@/utils/isContainOnlyNumber";
import z from "zod";

export const userProfileSchema = z.object({
  avatar: z.object({
    url: z.string().url(),
    public_id: z.string(),
  }),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  mobileNo: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

export const EditFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name should be 3 Character Long ")
      .max(255, "Name should be no Longer than 255 Character "),
    description: z
      .string()
      .min(3, "Description should be 3 Character Long ")
      .max(255, "Description should be no Longer than 255 Character "),
    mobileNo: z.string().min(11, "Mobile Number should be 11 Character Long"),
  })
  .refine(
    (data) => {
      if (data.mobileNo) {
        return isContainOnlyNumber(data.mobileNo);
        const regex = new RegExp(/[a-zA-Z!@#$%^&*(),.?":{}|<>\-]/g);
        return !regex.test(data.mobileNo);
      }
      return false;
    },
    {
      message: "Don't Enter (-), (+) or Alphabet in mobile number",
      path: ["mobileNo"],
    }
  );

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Password should be 8 Character Long"),
    newPassword: z.string().min(8, "Password should be 8 Character Long"),
    confirmPassword: z.string().min(8, "Password should be 8 Character Long"),
  })
  .refine(
    (data) => {
      if (data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New Password and Confirm Password should be same",
      path: ["confirmPassword"],
    }
  );

export const ForgetPasswordSchema = z.object({
  email: z.string().email(),
});


export type ForgetPasswordType = z.infer<typeof ForgetPasswordSchema>;
export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
export type EditFormType = z.infer<typeof EditFormSchema>;
