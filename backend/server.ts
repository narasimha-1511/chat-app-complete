import { Response, Request } from "express";
const Express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/messages.rotues";
import { userRoutes } from "./routes/user.routes";

import connectToMongo from "./db/connectToMongo";
import { IDatabase } from "./interfaces";

dotenv.config();
const app = Express();
const __dirnamee = path.resolve();

app.use(cors());
app.use(Express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

app.use(Express.static(path.join(__dirnamee, "/chat-app/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirnamee, "chat-app", "dist", "index.html"));
});

app.listen(process.env.PORT, async () => {
  await connectToMongo();
  console.log(`Server is running on port ${process.env.PORT}`);
});
