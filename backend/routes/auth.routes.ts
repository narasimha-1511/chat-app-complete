import Express , {Request , Response} from 'express';
import AuthController from '../controllers/auth.controller';
const authRoutes = Express.Router();

authRoutes.get("/login", AuthController.login);

authRoutes.get("/signup", AuthController.signup);

authRoutes.get("/logout", AuthController.logout);

export default authRoutes