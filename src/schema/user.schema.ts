import { number, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    email: string({ required_error: "Please enter an email" }).email(
      "please provide a valid email"
    ),
    firstName: string({ required_error: "Please enter you name" }),
    lastName: string(),
    password: string({ required_error: "Please enter a password" }).min(
      6,
      "Password must be at least 6 character long"
    ),
    confirmPassword: string({ required_error: `please confirm your password` }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.confirmPassword"
>;

export const updateUserDetails = object({
  body: object({
    phoneNumber: number().optional(),
    address: object({
      address1: string({
        required_error: "please enter your home address",
      }).max(100, "Home address is too big, please fill other fields"),
      address2: string({
        required_error: "please enter your local address",
      }).max(100, "Local address is too big, please fill other fields"),
      city: string({ required_error: "Please enter your city name" }).max(
        30,
        "Enter a valid city name"
      ),
      state: string({ required_error: "Please enter your state name" }).max(
        30,
        "Enter a valid state name"
      ),
      country: string({ required_error: "Please enter your country name" }).max(
        30,
        "Enter a valid country name"
      ),
    }),
  }),
});

export type updateUserDetailsType = TypeOf<typeof updateUserDetails>;
