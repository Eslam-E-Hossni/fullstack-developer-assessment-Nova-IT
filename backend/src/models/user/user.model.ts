import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config/";

const userSchema = new Schema<TUser, UserModel>({
  username: {
    type: String,
    unique: true,
  },
  nid: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "superAdmin"],
    default: "user",
  },
  adduserID: String,
  fullName: String,
  nationality: String,
  residentialAddress: String,
  identificationType: String,
  identificationNumber: String,
  issueDate: Date,
  expirationDate: Date,
  sourceOfFunds: String,
  purposeOfAccount: String,
});

userSchema.pre("save", async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", function (doc: TUser & Document, next) {
  doc.password = "";
  next();
});

userSchema.statics.findByCredentials = async function (
  username: string,
  password: string
) {
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new Error("Invalid login credentials");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

userSchema.statics.isUserExistById = async function (_id: string) {
  return await User.findOne({ _id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);