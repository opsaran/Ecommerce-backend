import { NextFunction, Request, Response } from "express";
import { AnyKeys } from "mongoose";
import { productinputInterface } from "../models/product.model";
import {
  createProductInput,
  deleteProductInput,
  findProductInput,
  modifyProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  findProduct,
  deleteProduct,
  updateProduct,
  findProducts,
} from "../services/product.service";
import { jwtPayloadInterface } from "../types/input.types";

export async function createProductHandler(
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response,
  next: NextFunction
) {
  const user: jwtPayloadInterface = res.locals.user;
  try {
    const product = await createProduct({ seller: user._id, ...req.body });
    res.status(200).send(product);
  } catch (err: any) {
    res.status(400).send(err.errors);
  }
}

export async function modifyProductHandler(
  req: Request<modifyProductInput["params"], {}, modifyProductInput["body"]>,
  res: Response
) {
  const user: jwtPayloadInterface = res.locals.user;
  try {
    const modifiedProduct = await updateProduct(
      { _id: req.params.id, seller: user._id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, data: modifiedProduct });
  } catch (err: any) {
    return res.status(400).send(err.message);
  }
}

export async function getProductHandler(
  req: Request<findProductInput["params"]>,
  res: Response
) {
  try {
    const product = await findProduct({ _id: req.params.id });
    return res.status(200).json({ success: false, product: product });
  } catch (err: any) {
    return res.status(404).json({ success: false, message: err.message });
  }
}

export async function getFeaturedTenProducts(req: Request, res: Response) {
  try {
    const featuredProducts = await findProducts(12);
    return res.status(200).json({ success: true, featuredProducts });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, couldn't fetch products",
    });
  }
}

export async function deleteProductHandler(
  req: Request<deleteProductInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await deleteProduct({ _id: req.params.id });
    res.status(200).json({ status: "successfull", data: product });
  } catch (err: any) {
    res.status(400).send(err);
  }
}
