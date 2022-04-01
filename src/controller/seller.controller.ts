import busboy from "busboy";
import { Request, Response } from "express";

export default function createProductBySellerHandler(
  req: Request,
  res: Response
) {
  console.log(typeof req.body.images[0].base64);

  return res.status(200).send("ok");
}
