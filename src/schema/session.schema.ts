import { object, string } from "zod";
export const createSessionSchema = object({
  body: object({
    email: string({ required_error: "Email required" })
      .min(2, "invalid email")
      .max(50, "invalid string")
      .email("Please provide a valid email"),
    password: string({ required_error: "Password required" }).max(
      50,
      "Something went wrong"
    ),
  }),
});
