import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id: string;
  username: string;
  nid: string;
  email: string;
  password: string;
  adduserID?: string;
  role: keyof typeof USER_ROLE;
  fullName: string;
  nationality: string;
  residentialAddress: string;
  identificationType: string;
  identificationNumber: string;
  issueDate: Date;
  expirationDate: Date;
  sourceOfFunds: string;
  purposeOfAccount: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistById(_id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;