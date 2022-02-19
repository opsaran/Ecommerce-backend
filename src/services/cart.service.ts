import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CartModel, { cartDocumentInterface } from "../models/cart.model";
import { cartInputInterface } from "../models/cart.model";

export async function createCart(cartInput: cartInputInterface) {
  return CartModel.create(cartInput);
}

export async function findCart(query: FilterQuery<cartDocumentInterface>) {
  console.log("in cart.service, query: ", query);
  return CartModel.findOne(query).lean();
}

export async function updateCart(
  query: FilterQuery<cartDocumentInterface>,
  update: UpdateQuery<cartDocumentInterface>,
  options: QueryOptions = { lean: true, new: true }
) {
  return await CartModel.findOneAndUpdate(query, update, options);
}

export async function findCartAndProducts(
  query: FilterQuery<cartDocumentInterface>
) {
  return CartModel.findOne(query)
    .populate({
      path: "products",

      populate: {
        path: "_id",
        model: "Product",
        select: "_id title inStock price images",
      },
    })
    .select(["products", "user"]);
}
