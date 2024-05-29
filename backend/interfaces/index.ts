import mongoose, { Mongoose } from "mongoose";

export interface IDatabase{
    client : mongoose.Mongoose;
}