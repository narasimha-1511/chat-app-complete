const Express = require("express");
import { Router } from "express";
import UserController from "../controllers/user.controller";
import Authorization from "../middleware/Auhtorization";

const userRoutes: Router = Express.Router();

userRoutes.get("/", Authorization, UserController.getUsersforSidebar);

export { userRoutes };
