import * as z from "zod";
import { gql } from "@apollo/client";
import { SignupDto } from "@/types/login";
import { State } from "@/types/initial-state";
import { client } from "../setup/apollo/config";
import { signupSchema } from "@/schema/signupSchema";

export default async function signup(formdata: SignupDto) {
  console.log(formdata)
  const validatedFields = signupSchema.safeParse(formdata);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }
  const {firstName, lastName, email, password, checked} = validatedFields.data
  try {
    const response = await client.query({
      query: gql`
        mutation CreateAudience {
          createAudience(
            createAudienceInput: {
              email: ${email}
              fullname: ${firstName} ${lastName}
              password: ${password}
              role: AUDIENCE
              username: ${firstName}
            }
          ) {
            fullname
            id
            role
            userId
            username
          }
        }
      `,
    });
    return response;
  } catch (error) {
    console.error(`Error loggin in user`);
  }
}
