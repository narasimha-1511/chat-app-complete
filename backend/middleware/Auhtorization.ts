import jwt  from "jsonwebtoken";
import { CustomJwtPayload } from "../types/jwt.types";
import { Response, NextFunction } from "express";
import dotenv from "dotenv";
import User from "../models/user.model";
import { CustomRequset } from "../types/req.types";
dotenv.config();

const Authorization = async (req: CustomRequset, res: Response, next:NextFunction) => {
    try{
        const token = req.cookies.token;

        if(!token){
          return  res.status(401).json({
                message: "Unauthorized User ! No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;

        if(!decoded){
           return res.status(401).json({
                message: "Unauthorized User ! Invalid token"
            });
        }

        const userId = decoded.userId;

        const UserExists = await User.findOne({userId}).select("-password");

        if(!UserExists){
            return res.status(401).json({
                message: "Unauthorized User ! User does not exist"
            });
        }

        req.user  = UserExists;

        next();
    }
    catch(error){
        console.log("Error while authenticating user");
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export default Authorization;