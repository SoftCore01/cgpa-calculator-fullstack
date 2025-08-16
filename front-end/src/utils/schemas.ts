import {z} from "zod";
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(32, "Password must be a maximum of 32 characters.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/\d/, "Password must contain at least one number.")
  .regex(
    /[!@#$%^&*()_+={}[\]|:;"'<>,.?/\\]/,
    "Password must contain at least one special character."
  );

export const signupSchema = z.object({
    username: z.string().min(6,{message: 'Username should be at lease 6 characters long'}).max(50),
    email: z.email(),
    password: passwordSchema,
})

export const signinSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});

export type SignUpSchema = z.infer<typeof signupSchema>
export type SignInSchema = z.infer<typeof signinSchema>