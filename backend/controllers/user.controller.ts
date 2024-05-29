import User from "../models/user.model";
import { Request, Response } from "express";
import { CustomRequset } from "../types/req.types";

export default class UserController {

    static async getUsersforSidebar(req: CustomRequset, res:Response ) {
        try {
          // @ts-ignore
          const loggedInUserId = req.user._id;

          console.log("Logged in User ID", loggedInUserId);
          console.log("data requested")

          const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
          }).select("-password");

          console.log("Filtered Users", filteredUsers);

          res.status(200).json({
            users: filteredUsers,
          });
        }
        catch (error) {
            console.error("Error in get Users for Sidebar Controller", error);
            res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }
}