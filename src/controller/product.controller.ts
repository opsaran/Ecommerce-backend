import { NextFunction, Request, Response } from "express";

import {
  createProductInput,
  deleteProductInput,
  findProductInput,
  getFeaturedProductsSchemaType,
  modifyProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  findProduct,
  deleteProduct,
  updateProduct,
  findEstimatedDocumentCount,
  findFeaturedProducts,
} from "../services/product.service";
import { jwtPayloadInterface } from "../types/input.types";

export async function createProductHandler(
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response,
  next: NextFunction
) {
  console.log("request here ");
  const user: jwtPayloadInterface = res.locals.user;

  const newImagesArray = req.body.images.map((obj) => {
    return {
      name: obj.name,
      type: obj.type,
      size: obj.size,
      imgBuffer: Buffer.from(obj.base64, "base64"),
    };
  });
  const newData = { ...req.body, ["images"]: newImagesArray };
  try {
    const product = await createProduct({ seller: user._id, ...newData });
    if (product) {
      return res.status(200).json({ success: true });
    }
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.errors });
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
    if (product) {
      const newProduct = product.documentWithImgPath;
      return res.status(200).json({ success: true, product: newProduct });
    }
  } catch (err: any) {
    return res.status(404).json({ success: false, message: err.message });
  }
}

type ParsedQs = {
  page: number;
};
export async function getFeaturedProducts(req: Request, res: Response) {
  const ItemsPerPage = 8;
  const query = {};
  const page = (req.query.page as unknown as number) || 1;
  const skip = (page - 1) * ItemsPerPage; //starting from page 1 that's why
  try {
    const countPromise = findEstimatedDocumentCount(query);
    const featuredProductsPromise = findFeaturedProducts(
      query,
      skip,
      ItemsPerPage
    );
    const [count, featuredProducts] = await Promise.all([
      countPromise,
      featuredProductsPromise,
    ]);
    const totalPages = Math.ceil(count / ItemsPerPage);
    const newDocArray = featuredProducts.map((doc) => doc.documentWithImgPath);
    return res.status(200).json({
      success: true,
      featuredProducts: newDocArray,
      pagination: { page, totalPages },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, couldn't fetch products",
    });
  }
}

export async function deleteProductHandler(
  req: Request<deleteProductInput["params"]>,
  res: Response
) {
  try {
    const product = await deleteProduct({ _id: req.params.id });
    res.status(200).json({ status: "successfull", data: product });
  } catch (err: any) {
    res.status(400).send(err);
  }
}
