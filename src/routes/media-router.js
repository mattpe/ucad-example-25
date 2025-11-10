import express from 'express';
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
} from '../controllers/media-controller.js';

// All media endpoints handled with express router
const mediaRouter = express.Router();

mediaRouter
  .route('/')
  // Get all media items
  .get(getMedia)
  // post new media item
  .post(postMedia);

mediaRouter
  .route('/:id')
  // get media by id
  .get(getMediaById)
  // delete media
  .delete(deleteMedia);

export default mediaRouter;
