import { NextFunction, Request, Response } from "express";
import { findUser } from "../services/user.service";
import { jwtPayloadInterface } from "../types/input.types";

export default async function requireSeller(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const seller: jwtPayloadInterface = res.locals.user;

  try {
    const isSeller = await findUser({ _id: seller._id }, { isSeller: 1 });
    if (!isSeller)
      return res
        .status(400)
        .json({ success: false, message: "You're not a seller" });
    return next();
  } catch (err: any) {
    return res
      .status(400)
      .json({ success: false, message: "You're not a seller" });
  }
}
