import express from 'express';
import {postUser} from '../controllers/user-controller.js';
import {body} from 'express-validator';

const userRouter = express.Router();

userRouter
  .route('/')
  .post(
    body('username').trim().isLength({min: 3, max: 100}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 100}),
    body('email').trim().isEmail(),
    postUser,
  );

export default userRouter;
