import Express from 'express';
import UserController from '../controllers/user.controller';
import Authorization from '../middleware/Auhtorization';

const userRoutes = Express.Router();

userRoutes.get('/', Authorization,  UserController.getUsersforSidebar);

export default userRoutes;