import { boolean, number, object, string, optional, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "please provide a suitable title for this product",
    })
      .min(7, "title is too small")
      .max(100, "Please keep title within a range of 30 characters"),
    description: string({
      required_error: "please provide a suitable description",
    })
      .min(10, "description is too small")
      .max(300, "Please keep description within 100 characters"),
    catagory: string({ required_error: "please provide a suitable catagory" })
      .min(2, "catagory is invalid")
      .max(10, "catagory is invalid"),
    inStock: boolean({
      required_error: "please provide whether item is in stock or not",
    }),
    expiryTime: string({ required_error: "please provide an expiray time" })
      .min(2, "expiraytime is invalid")
      .max(20, "expiraytime is invalid"),
    price: number({ required_error: "Please provide price of the item" })
      .min(0, "Enter a valid price")
      .max(10000, "Enter a valid price"),
    defaultQuantity: string({
      required_error: "Please enter a default qantity",
    })
      .min(0, "Enter a valid quantity")
      .max(20, "Enter a valid quantity"),

    images: object({
      image1: string({ required_error: "Please provide at least one image" })
        .min(2, "Enter a valid image address")
        .max(1000, "Enter a valid address"),
      image2: string().optional(),
      image3: string().optional(),
    }),
  }),
};

const params = {
  params: object({
    id: string({ required_error: "Invaild request" }).max(
      200,
      "Invalid request"
    ),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const modifyProductSchema = object({
  ...payload,
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export type createProductInput = TypeOf<typeof createProductSchema>;
export type modifyProductInput = TypeOf<typeof modifyProductSchema>;
export type findProductInput = TypeOf<typeof getProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
