import mongoose from "mongoose";
import { productDocumentInterface } from "./product.model";
import { userDocumentInterface } from "./user.model";

export interface orderInputInterface {
  user: userDocumentInterface["_id"];
  products: { productId: productDocumentInterface["_id"]; quantity: number }[];

  totalPrice: number;
}

export interface orderDocumentInterface
  extends orderInputInterface,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "orders" }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
