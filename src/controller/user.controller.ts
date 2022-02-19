import { Request, Response } from "express";
import { omit } from "lodash";

import {
  createUser,
  findUser,
  updateUserdetails,
} from "../services/user.service";
import { updateUserDetailsType } from "../schema/user.schema";
import { userInputInterface } from "../models/user.model";
import { jwtPayloadInterface } from "../types/input.types";
import { createCart, findCart } from "../services/cart.service";
export async function createUserHandler(
  req: Request<{}, {}, userInputInterface>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    if (user._id) {
      try {
        const cart = await createCart({ user: user._id });
        return res.status(200).json({
          success: true,
          userData: omit(user.toJSON(), "password"),
          cartData: cart,
        });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "cart already exists" });
      }
    }
  } catch (err: any) {
    return res
      .status(409)
      .json({ success: false, message: "Email already registered" });
  }
}

export async function updateUserDetailsHandler(
  req: Request<{}, {}, updateUserDetailsType["body"]>,
  res: Response
) {
  //check if user is who is claiming to be
  const user: jwtPayloadInterface = res.locals.user;

  //We don't need as user is already authorized
  // const usercheck = await findUser({_id:user._id}, {lean:true})
  try {
    const updatedUser = await updateUserdetails(
      { _id: user._id },
      { ...req.body }
    );

    return res
      .status(200)
      .json({ seccess: true, user: omit(updatedUser?.toJSON(), "password") });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  try {
    const cartData = await findCart({ user: res.locals.user._id });
    console.log("in getcurrentuser, cartData: ", cartData);
    if (cartData) {
      console.log("cart already exists, okay: ", cartData);
      return res
        .status(200)
        .json({ success: true, user: res.locals.user, cart: cartData });
    } else {
      return res
        .status(200)
        .json({ success: true, user: res.locals.user, cart: null });
    }
  } catch (error) {
    console.log("cart does not exist: ", error);
    return res
      .status(200)
      .json({ success: true, user: res.locals.user, cart: null });
  }
}
