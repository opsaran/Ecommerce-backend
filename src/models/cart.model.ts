import mongoose from "mongoose";
import { productDocumentInterface } from "./product.model";
import { userDocumentInterface } from "./user.model";
export interface cartInputInterface {
  user: userDocumentInterface["_id"];

  products?: {
    _id: productDocumentInterface["_id"];
    quantity: number;
  }[];
}

export interface cartDocumentInterface
  extends cartInputInterface,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
//don't want to create a subdocument, it will automatically create an _id field on subdocuments as well.
//we can index the productid field
// const productInCartSchema = new mongoose.Schema();
const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    unique: true,
  },
  quantity: { type: Number, min: 1, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },

    products: [productSchema],
  },
  { timestamps: true, collection: "carts" }
);

cartSchema.index({ user: 1 });

// cartSchema.virtual("totalPrice").get(function (this: cartDocumentInterface) {
//   return this.products.reduce(function (total, product) {
//     return total + product.price * product.quantity;
//   }, 0);
// });

const CartModel = mongoose.model<cartDocumentInterface>("Cart", cartSchema);
export default CartModel;
