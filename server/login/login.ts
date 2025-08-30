// server/login/login.ts
import { loginSchema } from "@/schema/loginSchema";
import { State } from "@/types/initial-state";

export default async function login( formData: FormData) {
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(formData)) {
    data[key] = value as string;
  }
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null, // Explicitly set to undefined
    };
  }
  return {
    message: "Login successful",
  };
}