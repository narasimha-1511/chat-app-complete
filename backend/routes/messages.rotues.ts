import Express, {Request , Response} from 'express';
import MessageController from '../controllers/messages.controller';
import Authorization from '../middleware/Auhtorization';

const messageRoutes = Express.Router();

messageRoutes.post("/send/:id", Authorization , MessageController.sendMessage);
messageRoutes.get("/get/:id", Authorization , MessageController.getMessages);

export default messageRoutes;