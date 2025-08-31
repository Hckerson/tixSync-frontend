import * as z from "zod";

export const signupSchema = z.object({
  email: z.string().email({message:"Enter a valid email"}),
  firstName: z.string().min(1,{message:"First name cannot be empty"}),
  lastName: z.string().min(1,{message:"Last name cannot be empty"}),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 letter" })
    .max(20, { message: "Password must be less than 20 letter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        "password must contian a capital letter, a small letter and a number",
    }),
  checkbox: z.boolean({})
});
  