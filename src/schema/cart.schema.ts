import { type } from "os";
import { array, number, object, string, TypeOf } from "zod";

const productId = string({ required_error: "Something went wrong" }).max(
  30,
  "Something went wrong"
);

const product = object({
  product: productId,
  quantity: number({ required_error: "You have to choose products" })
    .min(1, "Please provide a valid quantity")
    .max(100, "Too many items"),
});

const cartPayload = {
  body: object({
    products: array(product),
  }),
};

const editCartPayload = {
  body: object({
    product: product,
  }),
};

const paramsPayload = {
  params: object({
    cartId: string({ required_error: "What cart is this?" }).max(
      50,
      "I dont think thats the right way"
    ),
  }),
};

export const createCartSchema = object({
  ...cartPayload,
});
export const addToCartSchema = object({
  ...cartPayload,
  ...paramsPayload,
});

export const editProductInCart = object({
  ...editCartPayload,
  ...paramsPayload,
});

export const deleteProductInCartSchema = object({
  body: object({
    product: productId,
  }),
  ...paramsPayload,
});

export const getCartWithProductsSchema = object({
  ...paramsPayload,
});

export type createCartInputType = TypeOf<typeof createCartSchema>;
export type addToCartInputType = TypeOf<typeof addToCartSchema>;
export type editProductInCartInputType = TypeOf<typeof editProductInCart>;
export type deleteProductInCartInputType = TypeOf<
  typeof deleteProductInCartSchema
>;
export type getCartWithProductsInputType = TypeOf<
  typeof getCartWithProductsSchema
>;
