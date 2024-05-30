import { Response } from "express";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateTokenAndSetCookie = (userId: string, res: Response) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found in .env");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
    console.log("Error in generateTokenAndSetCookie", error);
    throw new Error("Error in generateTokenAndSetCookie");
  } finally {
    console.log("Token generated and cookie set");
  }
};

export default generateTokenAndSetCookie;
