import * as z from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 lwtter" })
    .max(20, { message: "Password must be less than 20 letter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        "password must contian a capital letter, a small letter and a number",
    }),
});
  