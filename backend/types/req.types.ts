import { Request } from 'express';
import User from '../models/user.model';

export type CustomRequset = Request & {
    user : any
}