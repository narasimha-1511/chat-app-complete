const express = require("express");
import AuthController from "../controllers/auth.controller";
const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);

authRoutes.post("/signup", AuthController.signup);

authRoutes.post("/logout", AuthController.logout);

export default authRoutes;
