import Express, {Response , Request , Express as TExpress } from 'express';
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/messages.rotues';
import userRoutes from './routes/user.routes';

import connectToMongo from './db/connectToMongo';
import { IDatabase } from './interfaces';

dotenv.config();
const app = Express();  

app.use(cors());
app.use(Express.json());
app.use(cookieParser());

app.get('/', (req:Request , res:Response ) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes)
app.use('/users', userRoutes);

app.listen(process.env.PORT, async () => {
    await connectToMongo();
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default class Server{

    db: IDatabase;
    engine: TExpress;

    constructor(database : IDatabase){
        this.engine = Express();
        this.db = database;
    }

    #defaultServerStart(){

    }

    start() {
        this.#defaultServerStart();
    }
}