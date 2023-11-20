import * as z from "zod";
//   Login Form
export const LoginForm = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be atLeast 8 characters"),
});

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name should be at least 5 characters")
      .max(30, "Name should be at most 30 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password should be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password should be at least 8 characters"),
    image: z.any().refine(
      (value) => {
        const validExtensions = [".png", ".jpg", ".jpeg"];
        const fileExtension = value.toLowerCase().match(/\.[0-9a-z]+$/);
        return (
          fileExtension !== null && validExtensions.includes(fileExtension[0])
        );
      },
      {
        message: "Image must have a PNG, JPG, or JPEG file extension",
      }
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type LoginFormType = z.infer<typeof LoginForm>;
