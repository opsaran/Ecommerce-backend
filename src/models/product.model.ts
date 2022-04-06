import mongoose from "mongoose";

import { userDocumentInterface } from "./user.model";

export interface productinputInterface {
  seller: userDocumentInterface["_id"];
  title: string;
  description: string;
  category: string;
  inStock: boolean;
  expiryTime: string;
  price: number;
  defaultQuantity: string;
  images: { name: string; type: string; size: number; imgBuffer: Buffer }[];
}

export interface productDocumentInterface
  extends productinputInterface,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  documentWithImgPath: any;
}

const imgObj = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  imgBuffer: {
    type: Buffer,
    required: true,
  },
});

const ProductShema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true, default: true },
    expiryTime: { type: String, required: true },
    price: { type: Number, required: true },
    defaultQuantity: { type: String, required: true },
    images: [imgObj],
  },
  { timestamps: true, collection: "products" }
);

ProductShema.index({ seller: 1 });

ProductShema.virtual("documentWithImgPath").get(function (this: any) {
  const newImgaesData = this.images.map((imgObj: any) => {
    return {
      name: imgObj.name,
      type: imgObj.type,
      size: imgObj.size,
      base64: `data:${
        imgObj.type
      };charset=utf-8;base64,${imgObj.imgBuffer.toString("base64")}`,
    };
  });

  return { ...this._doc, ["images"]: newImgaesData };
});

const productModel = mongoose.model<productDocumentInterface>(
  "Product",
  ProductShema
);

export default productModel;
