import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TUser } from "./user.interface";
import { UserServices } from "./user.service";
import { decodeToken } from "../../utils/hashOrDecodePW";
import config from "../../config";
import jwt from "jsonwebtoken";

// Helper function to format user response data
const formatUserResponse = (user: TUser) => {
  return {
    _id: user._id,
    username: user.username,
    nid: user.nid,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    nationality: user.nationality,
    residentialAddress: user.residentialAddress,
    identificationType: user.identificationType,
    identificationNumber: user.identificationNumber,
    issueDate: user.issueDate,
    expirationDate: user.expirationDate,
    sourceOfFunds: user.sourceOfFunds,
    purposeOfAccount: user.purposeOfAccount,
  };
};

// Register a new user
const UserController = catchAsync(async (req, res) => {
  const userData: TUser = req.body;
  const user = await UserServices.createUserIntoDB(userData);

  const responseData = formatUserResponse(user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: responseData,
  });
});

// User login
const userLoginController = catchAsync(async (req, res) => {
  const { nid, password } = req.body;

  console.log("Received nid:", nid);
  console.log("Received password:", password);

  const user = await UserServices.loginUserFromDB(nid, password);

  console.log("Authenticated user:", user);

  const payload = {
    _id: user._id,
    username: user.username,
    nid: user.nid,
    role: user.role,
    email: user.email,
    fullName: user.fullName,
    nationality: user.nationality,
  };

  if (!config.jwt_secret || !config.jwt_secret_IN) {
    throw new Error("JWT secret or expiration is not configured.");
  }

  const token = jwt.sign(payload, config.jwt_secret, {
    expiresIn: config.jwt_secret_IN,
  });

  console.log("Decoded token:", decodeToken(token, config.jwt_secret));

  const responseData = {
    user: {
      _id: user._id,
      username: user.username,
      nid: user.nid,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      nationality: user.nationality,
    },
    token,
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successful",
    data: responseData,
  });
});

// Get all users
const getAllUsersController = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

// Get user data by ID
const getUserDataController = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const userData = await UserServices.getUserData(userId);

  if (!userData) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User data not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data retrieved successfully",
    data: userData,
  });
});

export const UserControllers = {
  UserController,
  userLoginController,
  getAllUsersController,
  getUserDataController,
};
