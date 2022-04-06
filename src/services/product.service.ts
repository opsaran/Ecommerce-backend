import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import productModel, {
  productDocumentInterface,
  productinputInterface,
} from "../models/product.model";
// import { createProductInput } from "../schema/product.schema";

export async function createProduct(input: productinputInterface) {
  return productModel.create(input);
}

export async function findProduct(
  query: FilterQuery<productDocumentInterface>,
  options: QueryOptions = { lean: true }
) {
  return productModel.findOne(query, null, options);
}

export async function findEstimatedDocumentCount(
  query: FilterQuery<productDocumentInterface>
) {
  return productModel.estimatedDocumentCount(query);
}

export async function findFeaturedProducts(
  query: FilterQuery<productDocumentInterface>,
  skip: number,
  limit: number
) {
  return productModel.find(query).skip(skip).limit(limit);
}

export async function updateProduct(
  query: FilterQuery<productDocumentInterface>,
  update: UpdateQuery<productDocumentInterface>,
  options: QueryOptions = { lean: true }
) {
  return productModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(
  query: FilterQuery<productDocumentInterface>
) {
  return productModel.deleteOne(query);
}
