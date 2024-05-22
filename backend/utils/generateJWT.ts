import jwt from "jsonwebtoken";
import { Response } from "express";
const dotenv = require('dotenv');
dotenv.config();

const generateTokenAndSetCookie = (userId: string , res:Response )=> {

    const token = jwt.sign({userId}, process.env.JWT_SECRET as string , {
        expiresIn: "1d"
    });

    res.cookie("token" , token , {
        expires: new Date(Date.now() + 4*60*1000),
        httpOnly: true,
        secure: false
    });
}

export default generateTokenAndSetCookie;