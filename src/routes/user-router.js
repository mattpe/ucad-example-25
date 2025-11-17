import express from 'express';
import {postUser} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').post(postUser);

export default userRouter;
