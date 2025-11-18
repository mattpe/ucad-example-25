import express from 'express';
import {postUser} from '../controllers/user-controller.js';
import {body} from 'express-validator';
import { validationErrors } from '../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .post(
    body('username').trim().isLength({min: 3, max: 100}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 100}),
    body('email').trim().isEmail(),
    validationErrors,
    postUser,
  );

export default userRouter;
