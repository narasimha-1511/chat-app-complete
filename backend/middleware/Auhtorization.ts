const jwt = require("jsonwebtoken");
import { CustomJwtPayload } from "../types/jwt.types";
import { Response, NextFunction } from "express";
const dotenv = require("dotenv");
import User from "../models/user.model";
import { CustomRequset } from "../types/req.types";
dotenv.config();

const Authorization = async (
  req: CustomRequset,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    console.log("Token", token);

    if (token === undefined) {
      return res.status(401).json({
        error: "Unauthorized User ! No token provided",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error: "jwt secret not found in .env file",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as CustomJwtPayload;

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized User ! Invalid token",
      });
    }

    const userId = decoded.userId;
    console.log(userId);
    const UserExists = await User.findOne({ _id: userId }).select("-password");

    if (!UserExists) {
      return res.status(401).json({
        message: "Unauthorized User ! User does not exist",
      });
    }

    // @ts-ignore
    req.user = UserExists;

    next();
  } catch (error) {
    console.log("Error while authenticating user");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default Authorization;
