import User from "../models/user.model";
import { Request, Response } from "express";
import { CustomRequset } from "../types/req.types";

export default class UserController {

    static async getUsersforSidebar(req: CustomRequset, res:Response ) {
        try {

            const loggedInUserId = req.user._id;
            
            const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
            
            res.status(200).json({
                users: filteredUsers
            });
        
        }
        catch (error) {
            console.error("Error in get Users for Sidebar Controller", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}