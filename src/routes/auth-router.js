import express from 'express';
import {postLogin} from '../controllers/user-controller.js';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);

export default authRouter;
