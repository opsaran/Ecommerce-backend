import mongoose from "mongoose";
import { userDocumentInterface } from "./user.model";

export interface productinputInterface {
  seller: userDocumentInterface["_id"];
  title: string;
  description: string;
  catagory: string;
  inStock: boolean;
  expiryTime: string;
  price: number;
  defaultQuantity: string;
  images: { image1: string; image2?: string; image3?: string };
}

export interface productDocumentInterface
  extends productinputInterface,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ProductShema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    catagory: { type: String, required: true },
    inStock: { type: Boolean, required: true, default: true },
    expiryTime: { type: String, required: true },
    price: { type: Number, required: true },
    defaultQuantity: { type: String, required: true },
    images: {
      image1: { type: String, required: true },
      image2: { type: String },
      image3: { type: String },
    },
  },
  { timestamps: true, collection: "products" }
);

const productModel = mongoose.model<productDocumentInterface>(
  "Product",
  ProductShema
);

export default productModel;
