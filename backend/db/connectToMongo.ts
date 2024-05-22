import { error } from "console";

const mongoose = require("mongoose");

export default async function connectToMongo() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch ((error : Error) => console.log("Error connecting to MongoDB", error));
}