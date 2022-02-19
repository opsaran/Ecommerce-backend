import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserModel, {
  userDocumentInterface,
  userInputInterface,
} from "../models/user.model";
import { updateUserDetailsType } from "../schema/user.schema";

//function for creating a User document
export async function createUser(input: userInputInterface) {
  return UserModel.create(input);
}

export async function findUser(query: FilterQuery<userDocumentInterface>) {
  // console.log("in user.service, query: ", query);
  return UserModel.findOne(query).lean();
}

export async function updateUserdetails(
  query: FilterQuery<userDocumentInterface>,
  update: UpdateQuery<userDocumentInterface>,
  options: QueryOptions = { lean: true }
) {
  return await UserModel.findOneAndUpdate(query, update, options);
}
// export async function loginUser({
//   email,
//   password,
// }: {
//   email: userDocumentInterface["email"];
//   password: userDocumentInterface["password"];
// }) {
//   const user = await findUser({ email }, { lean: false });
//   if (!user) {
//     throw new Error("User does not exists..");
//   }
//   return user.comparePassword(password);
// }

export async function deleteUsers() {
  await UserModel.deleteMany({});
}

//for validating the password

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
    return omit(user.toJSON(), "password");
  } catch (err: any) {
    return false;
  }
}
