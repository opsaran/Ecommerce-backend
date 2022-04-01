import { Express, NextFunction, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import {
  createProductSchema,
  deleteProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getFeaturedTenProducts,
  getProductHandler,
} from "./controller/product.controller";
import logger from "./utils/logger";
import { createSessionSchema } from "./schema/session.schema";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";

import requireUser from "./middleware/requireUser";
import {
  createCartSchema,
  addToCartSchema,
  editProductInCart,
  deleteProductInCartSchema,
  getCartWithProductsSchema,
} from "./schema/cart.schema";
import {
  addToCartHandler,
  editProdroductInCartHandler,
  findCartAndProductsHandler,
} from "./controller/cart.controller";
import createProductBySellerHandler from "./controller/seller.controller";

export default function routes(app: Express) {
  app.get("/checkhealth?", (req: Request, res: Response) => {
    console.log("here it comes");
    console.log(req.query.id);
    res.send("okay");
  });
  const sayshi = function (req: Request, res: Response, next: NextFunction) {
    logger.info("Someone pinged here");
    return next();
  };
  const checkheaders = (req: Request, res: Response, next: NextFunction) => {
    console.log("headers here:", req.headers);
    return next();
  };

  app.post(
    "/api/register",
    sayshi,
    validateResource(createUserSchema),
    createUserHandler
  );

  app.get("/api/me", sayshi, requireUser, getCurrentUserHandler);
  app.post(
    "/api/sessions",
    sayshi,
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", sayshi, requireUser, getUserSessionHandler);
  app.delete("/api/session", sayshi, requireUser, deleteUserSessionHandler);

  app.get("/api/featuredproducts", sayshi, getFeaturedTenProducts);
  app.get("/api/product/:id", sayshi, getProductHandler);
  app.post(
    "/api/seller/createproduct",
    sayshi,
    requireUser,
    validateResource(createProductSchema),
    createProductHandler
  );

  app.delete(
    "/api/internal/deleteproduct",
    sayshi,
    validateResource(deleteProductSchema),
    deleteProductHandler
  );

  //for cart operations

  app.post(
    "/api/cart/addtocart/:cartId",
    sayshi,
    requireUser,
    validateResource(addToCartSchema),
    addToCartHandler
  );

  app.put(
    "/api/cart/editProductInCart/:cartId",
    sayshi,
    requireUser,
    validateResource(editProductInCart),
    editProdroductInCartHandler
  );
  app.put(
    "/api/cart/deleteProductInCart",
    sayshi,
    requireUser,
    validateResource(deleteProductInCartSchema)
  );

  app.get(
    "/api/cart/fullcart/:cartId",
    sayshi,
    requireUser,
    validateResource(getCartWithProductsSchema),
    findCartAndProductsHandler
  );

  // app.post("/api/seller/product", sayshi, createProductBySellerHandler);
}
