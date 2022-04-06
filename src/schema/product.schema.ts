import { z, boolean, number, object, string, TypeOf, array } from "zod";

const img = object({
  name: string({ required_error: "There must be a name of image" }).max(
    100,
    "Image name is too big"
  ),
  type: string({ required_error: "There must be a type of image" }).max(
    100,
    "image type looks sus"
  ),
  size: number({ required_error: "There must be a name of image" }).max(
    1048576,
    "Images are too big, each image should be smaller than 1 MB"
  ),
  base64: string({ required_error: "Please select a valid image" }),
});

const payload = {
  body: object({
    title: string({
      required_error: "please provide a suitable title for this product",
    })
      .min(2, "title is too small")
      .max(100, "Please keep title within a range of 30 characters"),
    description: string({
      required_error: "please provide a suitable description",
    })
      .min(5, "description is too small")
      .max(300, "Please keep description within 300 characters"),
    category: z.enum(["fashion", "food", "electronics", "book", "grocery"]),
    inStock: boolean({
      required_error: "please provide whether item is in stock or not",
    }),
    expiryTime: z.enum([
      "none",
      "1 month",
      "2 month",
      "3 month",
      "4 month",
      "5 month",
      "6 month",
    ]),
    price: number({ required_error: "Please provide price of the item" })
      .min(0, "hah, too cheap. Increase the price maybe")
      .max(10000, "Nobody will buy such a costly thing"),
    defaultQuantity: z.enum(["1 unit", "1 litre", "1 kg"]),
    images: array(img)
      .max(3, "Maximum number of images is 3")
      .nonempty("Please select atleast one image"),
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

const query = {
  query: object({
    page: string({ required_error: "Page number required" }),
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

export const getFeaturedProductsSchema = object({
  ...query,
});

export type createProductInput = TypeOf<typeof createProductSchema>;
export type modifyProductInput = TypeOf<typeof modifyProductSchema>;
export type findProductInput = TypeOf<typeof getProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
export type getFeaturedProductsSchemaType = TypeOf<
  typeof getFeaturedProductsSchema
>;
