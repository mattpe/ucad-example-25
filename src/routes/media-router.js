import express from 'express';
import multer from 'multer';
import {
  deleteMedia,
  getMedia,
  getMediaById,
  getMediaByUser,
  postMedia,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

// All media endpoints handled with express router
const mediaRouter = express.Router();
const upload = multer({dest: process.env.UPLOADS_PATH});

mediaRouter
  .route('/')
  // Get all media items
  .get(getMedia)
  // post new media item
  .post(authenticateToken, upload.single('file'), postMedia);

mediaRouter.route('/user').get(authenticateToken, getMediaByUser);

mediaRouter
  .route('/:id')
  // get media by id
  .get(getMediaById)
  // delete media
  .delete(deleteMedia);



export default mediaRouter;
