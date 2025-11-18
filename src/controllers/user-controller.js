// user logic here
// TODO: add all based on requirements!!

import jwt from 'jsonwebtoken';
import {addUser, selectUserByUsername} from '../models/user-model.js';
import 'dotenv/config';
import {validationResult} from 'express-validator';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await selectUserByUsername(req.body.username);
  const passwordMatch = user && user.password === req.body.password;
  if (passwordMatch) {
    // DO NOT send password to client
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({...user, token});
  } else {
    res.sendStatus(401);
  }
};

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newUser = req.body;
  // regular user level by default
  newUser.user_level_id = 1;
  const result = await addUser(newUser);
  if (result.user_id) {
    return res.json({message: 'User created.', user_id: result.user_id});
  } else {
    return res.status(400).res.json({});
  }
};

const getMe = async (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  }
};

export {postLogin, postUser, getMe};
