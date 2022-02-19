import mongoose from "mongoose";
import { userDocumentInterface } from "./user.model";

export interface sessionInputInterface {
  user: userDocumentInterface["_id"];
  valid: boolean;
  userAgent: string;
}

export interface sessionDocumentInterface
  extends sessionInputInterface,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true, collection: "sessions" }
);

const sessionModel = mongoose.model<sessionDocumentInterface>(
  "Session",
  sessionSchema
);

export default sessionModel;
