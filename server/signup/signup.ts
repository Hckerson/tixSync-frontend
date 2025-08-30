import { State } from "@/types/initial-state";
import { signupSchema } from "@/schema/signupSchema";
import * as z from "zod";

export default function signup(prevState = {}, formdata: FormData) {
  const data: Record<string, string> = {}
  Object.entries(formdata).map(([key, value]) => (data[key] = value));
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  
  
}
