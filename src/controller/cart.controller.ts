import { Request, Response } from "express";
import CartModel from "../models/cart.model";
import {
  createCartInputType,
  addToCartInputType,
  editProductInCartInputType,
  deleteProductInCartInputType,
  getCartWithProductsInputType,
} from "../schema/cart.schema";
import {
  findCart,
  findCartAndProducts,
  updateCart,
} from "../services/cart.service";

export async function addToCartHandler(
  req: Request<addToCartInputType["params"], {}, addToCartInputType["body"]>,
  res: Response
) {
  //getting the user id we set up in deserializeUser
  const user = res.locals.user._id;
  try {
    const cartData = await updateCart(
      { user: user, _id: req.params.cartId },
      {
        $addToSet: {
          products: {
            _id: req.body.products[0].product,
            quantity: req.body.products[0].quantity,
          },
        },
      }
    );

    return res.status(200).json({ success: true, cart: cartData });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Not valid data" });
  }
}

export async function editProdroductInCartHandler(
  req: Request<
    editProductInCartInputType["params"],
    {},
    editProductInCartInputType["body"]
  >,
  res: Response
) {
  const user = res.locals.user._id;
  try {
    const newCartData = await updateCart(
      {
        user: user,
        _id: req.params.cartId,
      },
      {
        $set: {
          "products.$[elem].quantity": req.body.product.quantity,
        },
      },
      {
        arrayFilters: [{ "elem.product": req.body.product.product }],
        lean: true,
        new: true,
      }
    );
    return res.status(200).json({ success: true, cart: newCartData });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Wrong data, sir",
    });
  }
}

export async function deleteProductInCart(
  req: Request<
    deleteProductInCartInputType["params"],
    {},
    deleteProductInCartInputType["body"]
  >,
  res: Response
) {
  const user = res.locals.user._id;
  try {
    const newCart = await updateCart(
      { user: user, _id: req.params.cartId },
      {
        $pull: {
          products: { product: req.body.product },
        },
      }
    );

    return res.status(200).json({ success: true, cart: newCart });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "What do you even wanna delete?" });
  }
}

export async function findCartAndProductsHandler(
  req: Request<getCartWithProductsInputType["params"]>,
  res: Response
) {
  try {
    const fullCart = await findCartAndProducts({ _id: req.params.cartId });
    if (fullCart) {
      return res.status(200).json({ success: true, fullCart: fullCart });
    }
  } catch (error: any) {
    return res
      .status(400)
      .json({ success: false, message: "Some error occured" });
  }
}
