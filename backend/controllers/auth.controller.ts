import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateJWT";

export default class AuthController {

    static async login(req: Request, res: Response) {
        
        try{
            const {userName, password} = req.body;

            const user = User.findOne({userName});

            if(!user){
                return res.status(400).json({
                    "message":"User not found"
                })
            }
            
            //@ts-ignore
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({
                    "message":"Invalid Credentials"
                })
            }

            //@ts-ignore
            generateTokenAndSetCookie(user.id , res);

            res.status(200).json({
                //@ts-ignore
                _id: user.id,
                //@ts-ignore
                fullName: user.fullName,
                //@ts-ignore
                userName: user.userName,
                //@ts-ignore
                profilePic: user.profilePic,
            })

        }
        catch(error){
            console.log("Error in login Controller", error)
            res.status(500).json({
                message:" Internal Server Error"
            });
        }
    }

    static async signup(req: Request, res: Response) {
        
        try{
            const {fullName, userName, password , confirmPassword, gender} = req.body;
            
            if(password != confirmPassword){
                return res.status(400).json({
                    "error":"passswords don't match"
                })
            }

            const user =  await User.findOne({userName});

            if(user){
                return res.status(400).json({
                    "error":"User already exists"
                })
            }

            //take the password and hash it     
            const hashedPassword = await bcrypt.hash(password, 10);

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

            const newUser = new User({
                fullName: fullName,
                userName: userName,
                password: hashedPassword,
                gender: gender,
                profilePic: (gender == "male") ? boyProfilePic : girlProfilePic, 
            });

            await newUser.save();

            if(newUser){

                generateTokenAndSetCookie(newUser.id , res);
    
                res.status(201).json({
                    _id: newUser.id,
                    fullName: newUser.fullName,
                    userName: newUser.userName,
                    profilePic: newUser.profilePic,
                })
            }
            else{
                res.status(400).json({
                    "error":"User not created error with data given"
                })
            }

        }

        catch(error){
            console.log("Error in signup Controller", error)
            res.status(500).json({
                message:" Internal Server Error"
            });
        }
    }

    static async logout(req: Request, res: Response) {
        try{
            res.clearCookie("token");
            res.status(200).json({
                message:"Logged Out Successfully"
            })
        }
        catch(error){
            console.log("Error in logout Controller", error)
            res.status(500).json({
                message:" Internal Server Error"
            });
        }
    }
}