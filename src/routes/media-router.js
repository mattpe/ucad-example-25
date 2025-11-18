import express from 'express';
import {
  deleteMedia,
  getMedia,
  getMediaById,
  getMediaByUser,
  postMedia,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import upload from '../middlewares/upload.js';
import {body} from 'express-validator';

// All media endpoints handled with express router
const mediaRouter = express.Router();

mediaRouter
  .route('/')
  // Get all media items
  .get(getMedia)
  // post new media item
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').isLength({min: 3, max: 100}),
    // TODO: add required validation rules
    postMedia,
  );

mediaRouter.route('/user').get(authenticateToken, getMediaByUser);

mediaRouter
  .route('/:id')
  // get media by id
  .get(getMediaById)
  // delete media
  .delete(deleteMedia);

export default mediaRouter;
