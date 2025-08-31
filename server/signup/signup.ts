import * as z from "zod";
import { gql } from "@apollo/client";
import { SignupDto } from "@/types/login";
import { State } from "@/types/initial-state";
import { client } from "../setup/apollo/config";
import { signupSchema } from "@/schema/signupSchema";

export default async function signup(formdata: SignupDto) {
  const validatedFields = signupSchema.safeParse(formdata);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { firstName, lastName, email, password, checkbox } =
    validatedFields.data;

  return {
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  };
}

// mutation: gql`
// mutation CreateAudience {
//   createAudience(
//     createAudienceInput: {
//       email: ${email}
//       fullname: ${firstName} ${lastName}
//       password: ${password}
//       role: AUDIENCE
//       username: ${email}
//     }
//   ) {
//     fullname
//     id
//     role
//     userId
//     username
//   }
// }
// `,
