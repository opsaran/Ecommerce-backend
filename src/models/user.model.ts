import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import config from "config";

export interface userInputInterface {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isSeller?: boolean;
  phoneNumber?: number;
  address?: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
  };
}

export interface userDocumentInterface extends userInputInterface, Document {
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { required: true, type: String, unique: true, lowercase: true },
    firstName: { required: true, type: String },
    lastName: { required: false, type: String },
    password: { required: true, type: String },
    isSeller: { type: Boolean, default: false },
    phoneNumber: Number,
    address: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      country: String,
      pinCode: Number,
    },
  },
  { collection: "users", timestamps: true }
);

//since we will query using emails
UserSchema.index({ email: 1 });

//virtual
UserSchema.virtual("fullName").get(function (this: userDocumentInterface) {
  return this.firstName + " " + this.lastName;
});

//pre hook
UserSchema.pre("save", async function (this: userDocumentInterface, next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(this.password, salt);

  //let's replace password with hash
  this.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as userDocumentInterface;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<userDocumentInterface>("User", UserSchema);

export default UserModel;
